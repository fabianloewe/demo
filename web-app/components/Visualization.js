import React from "react";
import dynamic from "next/dynamic";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
//import ForceGraph from "./ForceGraph";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyItems: 'center',
		alignItems: 'center',
		paddingLeft: 0,
		paddingRight: theme.spacing(1),
		width: '100%'
	}
}));

const ForceGraph2D = dynamic(() => import(/* webpackPrefetch: true */ "./ForceGraph2D"), {ssr: false});
const ForceGraph3D = dynamic(() => import(/* webpackPrefetch: true */ "./ForceGraph3D"), {ssr: false});

export default function Visualization({graph, settings}) {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			{settings.dimension === "2D"
			? <ForceGraph2D data={graph} settings={settings}/>
			: <ForceGraph3D data={graph} settings={settings}/>}
		</Container>
	);
}
