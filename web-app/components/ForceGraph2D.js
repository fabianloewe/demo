/**
 * Force Graph 2D implementation.
 *
 * Sources:
 * - Text in links: https://github.com/vasturiano/force-graph/blob/master/example/text-links/index.html
 * - Text in nodes: https://github.com/vasturiano/react-force-graph/blob/master/example/text-nodes/index-2d.html
 */

import React, {Ref, useCallback, useEffect, useRef, useState} from "react";
import {ForceGraph2D as ForceGraph2DEngine} from "react-force-graph";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		zIndex: 0,
	},
	infoCard: {
		color: "black",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	centerCard: {
		position: "fixed", /* or absolute */
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	}
}));

/**
 * Helper function to draw text for nodes.
 *
 * @param textHeight
 * @param color
 * @returns {function(*=, *, *, *): void}
 */
function drawNodeTextWithOptions(textHeight = 8, color = "black") {
	return (text, node, ctx, globalScale) => {
		const fontSize = textHeight / globalScale;
		const textWidth = ctx.measureText(text).width;
		const backgroundDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.fillRect(
			node.x - backgroundDimensions[0] / 2,
			node.y - backgroundDimensions[1] / 2,
			...backgroundDimensions
		);

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = color || node.color;
		ctx.fillText(text, node.x, node.y);
	}
}

/**
 * Helper function to draw text for links.
 *
 * @param textHeight
 * @param color
 * @returns {function(*=, *, *): (undefined)}
 */
function drawLinkTextWithOptions(textHeight = 4, color = "grey") {
	return (text, link, ctx) => {
		const start = link.source;
		const end = link.target;

		// Ignore unbound links
		if (typeof start !== 'object' || typeof end !== 'object') return;

		// Calculate label positioning
		const textPos = Object.assign(...['x', 'y'].map(c => ({
			[c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
		})));

		const relLink = {x: end.x - start.x, y: end.y - start.y};

		let textAngle = Math.atan2(relLink.y, relLink.x);
		// Maintain label vertical orientation for legibility
		if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
		if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

		// Estimate fontSize to fit in link length
		const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - 8;
		ctx.font = '1px Roboto';
		const fontSize = Math.min(textHeight, maxTextLength / ctx.measureText(text).width);
		ctx.font = `${fontSize}px Roboto`;
		const textWidth = ctx.measureText(text).width;
		const backgroundDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

		// Draw text label (with background rect)
		ctx.save();
		ctx.translate(textPos.x, textPos.y);
		ctx.rotate(textAngle);

		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.fillRect(
			-backgroundDimensions[0] / 2,
			-backgroundDimensions[1] / 2,
			...backgroundDimensions);

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = color || link.color;
		ctx.fillText(text, 0, 0);
		ctx.restore();
	}
}

/**
 * Draw the element's label.
 *
 * @param textHeight
 * @param color
 * @param isNode
 * @returns {function(*, *, *): void}
 */
function drawLabel(textHeight = 8, color = "black", isNode = true) {
	const drawText = isNode
		? drawNodeTextWithOptions(textHeight, color)
		: drawLinkTextWithOptions(textHeight, color);
	return (element, ctx, globalScale) => {
		const label = element.label;
		drawText(label, element, ctx, globalScale);
	}
}

/**
 * Draw the element's property specified by propName.
 *
 * If the property does not exist for a element, it draws the label as a fallback.
 *
 * @param propName
 * @param textHeight
 * @param color
 * @param isNode
 * @returns {function(*, *, *): (void)}
 */
function drawProperty(propName, textHeight = 8, color = undefined, isNode = true) {
	const drawText = isNode
		? drawNodeTextWithOptions(textHeight, color)
		: drawLinkTextWithOptions(textHeight, color);
	const drawLabelFallback = drawLabel(textHeight, color, isNode);
	return (element, ctx, globalScale) => {
		const prop = element.properties && element.properties[propName];
		if (prop !== undefined) {
			drawText(prop, element, ctx, globalScale);
		} else {
			// Draw the label as a fallback
			return drawLabelFallback(element, ctx, globalScale);
		}
	}
}

/**
 * Draws the direction of a link by drawing the source followed by an arrow and the target.
 *
 * @param settings
 * @param textHeight
 * @param color
 * @returns {function(*=, *=, *=): void}
 */
function drawDirection(settings, textHeight = 4, color = "grey") {
	const drawLink = drawLinkTextWithOptions(textHeight, color);
	return (link, ctx) => {
		let source, target;
		if (settings.vertexStyle === "property") {
			source = link.source.properties[settings.vertexStyleProp] || link.source.label;
			target = link.target.properties[settings.vertexStyleProp] || link.target.label;
		} else {
			source = link.source.label;
			target = link.target.label;
		}
		drawLink(`${source} -> ${target}`, link, ctx);
	}
}

/**
 * Draws an info card for the given element.
 *
 * @param classes The style classes
 * @param additionalClass An additional style class
 * @returns {function(*): string}
 */
function drawInfoCard(classes, additionalClass = "") {
	return element => {
		const props = element.properties !== undefined
			? Object
				.entries(element.properties)
				.map(([key, value]) => `<p>${key}: ${value}</p>`)
				.join("\n")
			: null;
		return `
      <div class="MuiPaper-root MuiPaper-elevation3 MuiPaper-rounded ${classes.infoCard} ${additionalClass}">
        <h4>${element.label}</h4>
        ${props || ""}
      </div>
    `.trim();
	};
}

/**
 * Info card to be rendered if centerPropertiesView is true
 *
 * @param element
 * @returns {JSX.Element}
 * @constructor
 */
function InfoCard({element}) {
	const classes = useStyles();
	const props = element.properties !== undefined
		? Object
			.entries(element.properties)
			.map(([key, value]) => <p>{key}: {value}</p>)
		: null;
	return (
		<div className={`MuiPaper-root MuiPaper-elevation3 MuiPaper-rounded ${classes.infoCard} ${classes.centerCard}`}>
			<h4>{element.label}</h4>
			{props || ""}
		</div>
	);
}

/**
 * @typedef Node
 * @property {string} id
 * @property {string} label
 * @property {{[string]: string}|undefined} properties
 */

/**
 * @typedef Link
 * @property {string} id
 * @property {string} label
 * @property {{[string]: string}|undefined} properties
 * @property {string|number|Node} source
 * @property {string|number|Node} target
 */

/**
 * The 3D force graph.
 *
 * @param {{nodes: [Node], links: [Link]}} data
 * @param forceGraphProps
 * @param settings
 * @returns {JSX.Element}
 * @constructor
 */
function ForceGraph2D({data, forceGraphProps, settings}) {
	const classes = useStyles();
	const theme = useTheme();
	const fgRef = useRef();
	const [highlight, setHighlight] = useState({
		nodes: [],
		link: null
	});
	const [graph, setGraph] = useState(data);
	const [selectedNodes, setSelectedNodes] = useState([]);
	const [centerPropView, setCenterPropView] = useState(null);
	const [prevZoomValue, setPrevZoomValue] = useState(1);

	const colorNode = node => {
		if (highlight.nodes.includes(node) || selectedNodes.includes(node)) {
			return theme.palette.secondary.main;
		} else {
			switch (node.label) {
				case "Meta-Vertex":
					return theme.palette.info.main;
				case "Vertex":
				case "Edge":
				default:
					return theme.palette.primary.main;
			}
		}
	};

	const colorLink = link => {
		if (link === highlight.link ||
			(selectedNodes.includes(link.source) &&
				selectedNodes.includes(link.target))
		) {
			return theme.palette.secondary.main;
		} else {
			return link.label === "Meta-Edge" ? theme.palette.primary.light : "white";
		}
	};

	const drawSpecialNode = (node, ctx) => {
		switch (node.label) {
			case "Edge":
				ctx.fillStyle = colorNode(node);
				ctx.fillRect(
					node.x - 3,
					node.y - 3,
					6,
					6
				);
				break;
			case "Vertex":
			default:
				ctx.fillStyle = colorNode(node);
				ctx.beginPath();
				ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
				ctx.fill();
				break;
		}
	};

	let drawNode;
	switch (settings.vertexStyle) {
		case "label":
			drawNode = drawLabel();
			break;
		case "property":
			drawNode = drawProperty(settings.vertexStyleProp);
			break;
		case "round":
		default:
			// Draw default nodes
			drawNode = drawSpecialNode;
			break;
	}

	let drawLink;
	switch (settings.edgeStyle) {
		case "label":
			drawLink = drawLabel(4, "grey", false);
			break;
		case "property":
			drawLink = drawProperty(settings.edgeStyleProp, 4, "grey", false);
			break;
		case "direction":
			drawLink = drawDirection(settings);
			break;
		case "nothing":
		default:
			// Draw default links
			drawLink = undefined;
			break;
	}

	let drawNodeLabel;
	if (settings.showProperties && !settings.centerPropertiesView) {
		drawNodeLabel = drawInfoCard(classes);
	} else {
		drawNodeLabel = "";
	}

	let drawLinkLabel;
	if (settings.showProperties && !settings.centerPropertiesView) {
		drawLinkLabel = drawInfoCard(classes);
	} else {
		drawLinkLabel = "";
	}

	let handleZoom = undefined;
	if (settings.enableScrollSelect) {
		handleZoom = ({k: zoomValue}) => {
			const zoomDiff = zoomValue - prevZoomValue;
			const zoomThreshold = 0.01;
			setPrevZoomValue(zoomValue);
			if (zoomDiff > zoomThreshold) {
				// When zooming in,
				// select nodes connected to the already selected ones.
				const nodes = graph.links
					.filter(link => selectedNodes.includes(link.source))
					.flatMap(link => link.target);
				// Distinct nodes only
				const newSelectedNodes = [...new Set([...selectedNodes, ...nodes])];
				setSelectedNodes(newSelectedNodes);
			}
		}
	}

	let handleBackgroundRightClick = undefined;
	if (settings.enableCut) {
		handleBackgroundRightClick = () => {
			if (selectedNodes.length > 1) {
				const links = graph.links.filter(link =>
					selectedNodes.includes(link.source) && selectedNodes.includes(link.target)
				);
				const selectedGraph = {
					nodes: selectedNodes,
					links
				};
				setGraph(selectedGraph);
			}
		};
	}

	const handleClick = (node, event) => {
		if (settings.enableShiftSelect && event.shiftKey) {
			selectedNodes.includes(node)
				? setSelectedNodes(selectedNodes.filter(n => n !== node))
				: setSelectedNodes([...selectedNodes, node]);
		} else if (selectedNodes.includes(node)) {
			setSelectedNodes(selectedNodes.filter(selectedNode => selectedNode !== node));
		} else {
			setSelectedNodes([node]);
		}
	};

	const handleNodeHover = node => {
		if ((!node && !highlight.nodes.length) || (node && highlight.nodes.includes(node))) return;
		setHighlight({
			nodes: [node],
			link: null
		});

		if (settings.centerPropertiesView) {
			setCenterPropView(node);
		}
	};

	const handleLinkHover = link => {
		if (!link || link === highlight.link) return;
		setHighlight({
			nodes: [link.source, link.target],
			link
		});

		if (settings.centerPropertiesView) {
			setCenterPropView(link);
		}
	};

	return (
		<div className={classes.container}>
			<ForceGraph2DEngine
				ref={fgRef}
				graphData={graph}
				enableNodeDrag={false}
				showNavInfo={true}
				backgroundColor={theme.palette.type === "light" ? "white" : "black"}
				linkWidth={link => link === highlight.link ? 4 : 1}
				linkDirectionalParticles={1}
				linkDirectionalParticleWidth={link => link === highlight.link ? 4 : 0}
				linkDirectionalParticleResolution={16}
				linkLabel={drawLinkLabel}
				linkCanvasObject={drawLink}
			  linkCanvasObjectMode={() => 'after'}
				nodeLabel={drawNodeLabel}
				onNodeHover={handleNodeHover}
				onLinkHover={handleLinkHover}
				onNodeClick={handleClick}
				nodeCanvasObject={drawNode}
				onZoom={handleZoom}
				onBackgroundRightClick={handleBackgroundRightClick}
				{...forceGraphProps}
			/>
			{centerPropView && <InfoCard element={centerPropView}/>}
		</div>
	);
}

export default ForceGraph2D;
