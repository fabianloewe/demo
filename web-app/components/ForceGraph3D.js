import React, {Ref, useCallback, useEffect, useRef, useState} from "react";
import {ForceGraph3D as ForceGraph3DEngine} from "react-force-graph";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BoxGeometry, Mesh, MeshLambertMaterial} from "three";
import SpriteText from "three-spritetext";

const cuboidGeometry = new BoxGeometry(6, 6, 6)
	.rotateX(90)
	.rotateZ(90);

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
 * Draw the node label.
 *
 * @param textHeight
 * @param color
 * @returns {function(*): SpriteText}
 */
function drawLabel(textHeight = 8, color = undefined) {
	return element => {
		const sprite = new SpriteText(element.label);
		sprite.color = color || element.color;
		sprite.textHeight = textHeight;
		// Must be set to non-null to prevent: https://github.com/vasturiano/3d-force-graph/issues/354
		sprite.scale.setZ(0.0000001);
		return sprite;
	}
}

/**
 * Draw the element property specified by propName.
 *
 * If the property does not exist for a element, it draws the label as a fallback.
 *
 * @param propName
 * @param textHeight
 * @param color
 * @returns {function(*=): (SpriteText)}
 */
function drawProperty(propName, textHeight = 8, color = undefined) {
	return element => {
		const prop = element.properties && element.properties[propName];
		if (prop !== undefined) {
			const sprite = new SpriteText(prop);
			sprite.color = color || element.color;
			sprite.textHeight = textHeight;
			// Must be set to non-null to prevent: https://github.com/vasturiano/3d-force-graph/issues/354
			sprite.scale.setZ(0.0000001);
			return sprite;
		} else {
			// Draw the label as a fallback
			return drawLabel()(element);
		}
	}
}

/**
 * Draws the direction of a link by drawing the source followed by an arrow and the target.
 *
 * @param settings
 * @param textHeight
 * @param color
 * @returns {function(*): SpriteText}
 */
function drawDirection(settings, textHeight = 4, color = "grey") {
	return link => {
		let source, target;
		if (settings.vertexStyle === "property") {
			source = link.source.properties[settings.vertexStyleProp] || link.source.label;
			target = link.target.properties[settings.vertexStyleProp] || link.target.label;
		} else {
			source = link.source.label;
			target = link.target.label;
		}
		// Extend link with text sprite
		const sprite = new SpriteText(`${source} -> ${target}`);
		sprite.color = color || link.color;
		sprite.textHeight = textHeight;
		return sprite;
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
 * The 3D force graph.
 *
 * @param data
 * @param forceGraphProps
 * @param settings
 * @returns {JSX.Element}
 * @constructor
 */
function ForceGraph3D({data, forceGraphProps, settings}) {
	const enableControls = true;
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

	const controlType = settings.controlType;

	const colorNode = node => {
		if (highlight.nodes.includes(node) || selectedNodes.includes(node)) {
			return theme.palette.secondary.main;
		} else {
			switch (node.label) {
				case "MetaVertex":
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
			return link.label === "MetaEdge" ? theme.palette.primary.light : "white";
		}
	};

	const drawSpecialNode = node => {
		let cuboidMaterial;
		switch (node.label) {
			case "Edge":
				cuboidMaterial = new MeshLambertMaterial({color: colorNode(node)});
				return new Mesh(cuboidGeometry, cuboidMaterial);
			case "Vertex":
			default:
				return null;
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

	const extendLink = settings.edgeStyle !== "nothing";
	let updateLinkPosition = (sprite, {start, end}) => {
		const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
			[c]: start[c] + (end[c] - start[c]) / 2 // Calc middle point
		})));

		// Position sprite
		Object.assign(sprite.position, middlePos);
	}
	let drawLink;
	switch (settings.edgeStyle) {
		case "label":
			drawLink = drawLabel(4, "grey");
			break;
		case "property":
			drawLink = drawProperty(settings.edgeStyleProp, 4, "grey");
			break;
		case "direction":
			drawLink = drawDirection(settings);
			break;
		case "nothing":
		default:
			// Draw default nodes
			drawLink = () => null;
			updateLinkPosition = () => {
			};
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

	let handleBackgroundRightClick;
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
		} else if (settings.enableZoom) {
			// Aim at node from outside it
			const distance = 40;
			const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

			fgRef.current.cameraPosition(
				{x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
				node, // lookAt ({ x, y, z })
				3000  // ms transition duration
			);

			setSelectedNodes([node]);
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
			<ForceGraph3DEngine
				ref={fgRef}
				graphData={graph}
				enableNodeDrag={false}
				enableNavigationControls={enableControls}
				controlType={controlType}
				showNavInfo={true}
				backgroundColor={theme.palette.type === "light" ? "white" : "black"}
				linkWidth={link => link === highlight.link ? 4 : 1}
				linkDirectionalParticles={1}
				linkDirectionalParticleWidth={link => link === highlight.link ? 4 : 0}
				linkDirectionalParticleResolution={16}
				linkColor={colorLink}
				linkLabel={drawLinkLabel}
				linkThreeObjectExtend={extendLink}
				linkThreeObject={drawLink}
				linkPositionUpdate={updateLinkPosition}
				nodeColor={colorNode}
				nodeResolution={32}
				nodeLabel={drawNodeLabel}
				onNodeHover={handleNodeHover}
				onLinkHover={handleLinkHover}
				onNodeClick={handleClick}
				nodeThreeObject={drawNode}
				onBackgroundRightClick={handleBackgroundRightClick}
				{...forceGraphProps}
			/>
			{centerPropView && <InfoCard element={centerPropView}/>}
		</div>
	);
}

export default ForceGraph3D;
