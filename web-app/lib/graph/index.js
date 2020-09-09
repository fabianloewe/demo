"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildGraph;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

/**
 * Correctly formats the properties of element.
 *
 * @param element A vertex or edge object
 * @returns {undefined|{[string]: string}} Correctly formatted properties or null if they were null before.
 */
function mapProperties(element) {
  // See the properties as a Map<String, String>
  return element.properties !== undefined ? Object.entries(element.properties) // For each property
  .map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return (0, _defineProperty2["default"])({}, key, value.includes("=") ? value.split("=")[1] : value);
  }) // Join mapped objects
  .reduce(function (previousValue, currentValue) {
    return Object.assign(previousValue, currentValue);
  }) : undefined;
}
/**
 * Build a force-graph compatible node from a vertex.
 *
 * @param vertex
 * @returns {{id: (*|string), label: string, properties: (undefined|{string?: string})}}
 */


function buildNode(vertex) {
  console.log("Vertex:", vertex);
  return {
    id: vertex.id || Math.random(),
    label: (vertex.labels || ["No label"]).join(" | "),
    properties: mapProperties(vertex)
  };
}
/**
 * Builds the EdgeOut and EdgeIn links from a hyperedge.
 *
 * It also adds the edge itself to the nodes
 * because hyperedges cannot be visualized directly.
 *
 * @param edge The edge to build a link from
 * @param nodes The already build nodes for the force-graph
 * @param edges The edges defined in the Answer message
 * @returns {({inVertex: (*|string), id: number, label: string, source: *, outVertex: *, properties: {}, target: {id: (*|string), label: string, properties: (undefined|{string?: string})}}|{inVertex: *, id: number, label: string, source: {id: (*|string), label: string, properties: (undefined|{string?: string})}, outVertex: (*|string), properties: {}, target: *})[]}
 */


function buildNodeAndLinksFromHyperedge(edge, nodes, edges) {
  console.log("Building link from hyperedge:", edge);
  var edgeAsNode = buildNode(edge);
  nodes.push(edgeAsNode);

  var buildEdgeOut = function buildEdgeOut() {
    var outVertex = nodes.find(function (node) {
      return node.id === edge.fromVertex;
    });

    if (outVertex === undefined) {
      console.error("Source vertex with id ".concat(edge.fromVertex, " not found"));
      return null;
    }

    var inVertex = edgeAsNode;
    return {
      id: Math.random(),
      label: "EdgeOut",
      properties: {},
      outVertex: outVertex.id,
      inVertex: inVertex.id,
      source: outVertex,
      target: inVertex
    };
  };

  var buildEdgeIn = function buildEdgeIn() {
    var outVertex = edgeAsNode;
    var inVertex = nodes.find(function (node) {
      return node.id === edge.toVertex;
    });

    if (inVertex === undefined) {
      console.error("Target vertex with id ".concat(edge.toVertex, " not found"));
      return null;
    }

    return {
      id: Math.random(),
      label: "EdgeIn",
      properties: {},
      outVertex: outVertex.id,
      inVertex: inVertex.id,
      source: outVertex,
      target: inVertex
    };
  };

  var buildMetaEdge = function buildMetaEdge(metaEdgeId) {
    var metaEdge = edges.find(function (e) {
      return e.id === metaEdgeId;
    });
    var outVertex = edgeAsNode;
    var inVertex = nodes.find(function (node) {
      return node.id === metaEdge.toVertex;
    });

    if (inVertex === undefined) {
      console.error("Target vertex with id ".concat(edge.toVertex, " not found"));
      return null;
    }

    return {
      id: metaEdgeId,
      label: "MetaEdge",
      properties: mapProperties(metaEdge),
      outVertex: outVertex.id,
      inVertex: inVertex.id,
      source: outVertex,
      target: inVertex
    };
  };

  return [buildEdgeOut(), buildEdgeIn()].concat((0, _toConsumableArray2["default"])((edge.metaEdges || []).map(buildMetaEdge))).filter(function (e) {
    return e !== null;
  });
}
/**
 * Build a force-graph compatible link from edge.
 *
 * @param nodes {[{id: (*|string), label: string, properties: (undefined|{string?: string})}]}
 * @param edges The edges defined in the Answer message
 * @returns {function(*=): (({inVertex: (*|string), id: number, label: string, source: *, outVertex: *, properties: {}, target: {id: (*|string), label: string, properties: (undefined|{string?: string})}}|{inVertex: *, id: number, label: string, source: {id: (*|string), label: string, properties: (undefined|{string?: string})}, outVertex: (*|string), properties: {}, target: *})[]|[]|[{inVertex: *|string, id, label, source: {id: (*|string), label: string, properties: (undefined|{string?: string})} | undefined, outVertex: *|string, properties: undefined|{string?: string}, target: {id: (*|string), label: string, properties: (undefined|{string?: string})} | undefined}])}
 */


function createLinkBuilder(nodes, edges) {
  return function (edge) {
    // If true, this is a specialized hyperedge, so handle it specially.
    if (edge.labels && edge.labels.includes("Edge")) {
      return buildNodeAndLinksFromHyperedge(edge, nodes, edges);
    } // Find the start vertex / the vertex this edge goes out of


    var outVertex = nodes.find(function (node) {
      return edge.fromVertex === node.id;
    }); // Find the end vertex / the vertex this edge goes into

    var inVertex = nodes.find(function (node) {
      return edge.toVertex === node.id;
    });

    if (outVertex === undefined || inVertex === undefined) {
      // There is no corresponding vertex so we can't present this edge
      return [];
    } else {
      console.log("Edge:", edge);
      return [{
        id: edge.id || Math.random(),
        label: (edge.labels || ["No label"]).join(" | "),
        properties: mapProperties(edge),
        inVertex: inVertex.id,
        outVertex: outVertex.id,
        source: outVertex,
        target: inVertex
      }];
    }
  };
}
/**
 * Builds a react-force-graph compatible graph structure.
 *
 * @param answer The JSON representation of an Answer message
 * @returns {{nodes: [*], links: [*]}} An object containing an array of nodes aka vertices and one of links aka edges.
 */


function buildGraph(answer) {
  console.log("Building graph from answer:", answer);
  var nodes = (answer.data.vertices || []).map(buildNode);
  var buildLink = createLinkBuilder(nodes, answer.data.edges);
  var links = (answer.data.edges || []).flatMap(buildLink);
  return {
    nodes: nodes,
    links: links
  };
}
//# sourceMappingURL=index.js.map