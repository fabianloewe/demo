import React from "react";
import dynamic from "next/dynamic";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useWindowSize} from "../src/utils";

const useStyles = makeStyles(theme => ({
	root: {
		position: 'absolute',
		left: -21,
		width: props => `${props.width}px`,
		height: props => `${props.height}px`,
	}
}));

const ForceGraph2D = dynamic(() => import(/* webpackPrefetch: true */ "./ForceGraph2D"), {ssr: false});
const ForceGraph3D = dynamic(() => import(/* webpackPrefetch: true */ "./ForceGraph3D"), {ssr: false});

export default function Visualization({graph, settings}) {
	const windowSize = useWindowSize();
	const classes = useStyles(windowSize);
	// Some space is needed for scrollbar
	const forceGraphProps = {width: windowSize.width - 20, height: windowSize.height};
		return (
		<Container className={classes.root}>
			{settings.dimension === "2D"
				? <ForceGraph2D data={graph} settings={settings} forceGraphProps={forceGraphProps}/>
				: <ForceGraph3D data={graph} settings={settings} forceGraphProps={forceGraphProps}/>}
		</Container>
	);
}
