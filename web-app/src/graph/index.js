/**
 * Correctly formats the properties of element.
 *
 * @param element A vertex or edge object
 * @returns {undefined|{[string]: string}} Correctly formatted properties or null if they were null before.
 */
function mapProperties(element) {
	// See the properties as a Map<String, String>
	return element.properties !== undefined
		? Object
			.entries(element.properties)
			// For each property
			.map(([key, value]) => ({
				// If value has format <key>=<value>, keep only <value>
				[key]: value.includes("=") ? value.split("=")[1] : value
			}))
			// Join mapped objects
			.reduce(((previousValue, currentValue) => Object.assign(previousValue, currentValue)))
		: undefined;
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
		id: vertex.id || "0",
		label: (vertex.labels || ["No label"]).join(" | "),
		properties: mapProperties(vertex)
	}
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
	const edgeAsNode = buildNode(edge);
	nodes.push(edgeAsNode);
	const buildEdgeOut = () => {
		const outVertex = nodes.find(node => node.id === edge.fromVertex);
		if (outVertex === undefined) {
			console.error(`Source vertex with id ${edge.fromVertex} not found`);
			return null;
		}
		const inVertex = edgeAsNode;
		return {
			id: Math.random(),
			label: "EdgeOut",
			properties: {},
			outVertex: outVertex.id,
			inVertex: inVertex.id,
			source: outVertex,
			target: inVertex,
		};
	}
	const buildEdgeIn = () => {
		const outVertex = edgeAsNode;
		const inVertex = nodes.find(node => node.id === edge.toVertex);
		if (inVertex === undefined) {
			console.error(`Target vertex with id ${edge.toVertex} not found`);
			return null;
		}
		return {
			id: Math.random(),
			label: "EdgeIn",
			properties: {},
			outVertex: outVertex.id,
			inVertex: inVertex.id,
			source: outVertex,
			target: inVertex,
		};
	}
	const buildMetaEdge = (metaEdgeId) => {
		const metaEdge = edges.find(e => e.id === metaEdgeId);
		const outVertex = edgeAsNode;
		const inVertex = nodes.find(node => node.id === metaEdge.toVertex);
		if (inVertex === undefined) {
			console.error(`Target vertex with id ${edge.toVertex} not found`);
			return null;
		}
		return {
			id: Math.random(),
			label: "MetaEdge",
			properties: mapProperties(metaEdge),
			outVertex: outVertex.id,
			inVertex: inVertex.id,
			source: outVertex,
			target: inVertex,
		};
	};

	return [
		buildEdgeOut(),
		buildEdgeIn(),
		...(edge.metaEdges || []).map(buildMetaEdge)
	].filter(e => e !== null);
}

/**
 * Build a force-graph compatible link from edge.
 *
 * @param nodes {[{id: (*|string), label: string, properties: (undefined|{string?: string})}]}
 * @param edges The edges defined in the Answer message
 * @returns {function(*=): (({inVertex: (*|string), id: number, label: string, source: *, outVertex: *, properties: {}, target: {id: (*|string), label: string, properties: (undefined|{string?: string})}}|{inVertex: *, id: number, label: string, source: {id: (*|string), label: string, properties: (undefined|{string?: string})}, outVertex: (*|string), properties: {}, target: *})[]|[]|[{inVertex: *|string, id, label, source: {id: (*|string), label: string, properties: (undefined|{string?: string})} | undefined, outVertex: *|string, properties: undefined|{string?: string}, target: {id: (*|string), label: string, properties: (undefined|{string?: string})} | undefined}])}
 */
function createLinkBuilder(nodes, edges) {
	return edge => {
		// If true, this is a specialized hyperedge, so handle it specially.
		if (edge.labels && edge.labels.includes("Edge")) {
			return buildNodeAndLinksFromHyperedge(edge, nodes, edges);
		}
		// Find the start vertex / the vertex this edge goes out of
		const outVertex = nodes.find(node => edge.fromVertex === node.id);
		// Find the end vertex / the vertex this edge goes into
		const inVertex = nodes.find(node => edge.toVertex === node.id);
		if (outVertex === undefined || inVertex === undefined) {
			// There is no corresponding vertex so we can't present this edge
			return [];
		} else {
			console.log("Edge:", edge);
			return [{
				id: edge.id || "0",
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
export default function buildGraph(answer) {
	console.log("Building graph from answer:", answer);
	const nodes = (answer.data.vertices || []).map(buildNode);
	const buildLink = createLinkBuilder(nodes, answer.data.edges);
	const links = (answer.data.edges || []).flatMap(buildLink);
	return {
		nodes,
		links
	}
}
