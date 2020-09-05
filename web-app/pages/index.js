import React from 'react';
import axios from "axios";
import QueryForm from "../components/QueryForm";
import VisualizationSettings from "../components/VisualizationSettings";
import Visualization from "../components/Visualization";
import buildGraph from "../src/graph";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Index = () => {
	const [graph, setGraph] = React.useState(null);
	const [settings, setSettings] = React.useState(null);

	const sendQuery = async query => {
		try {
			const result = axios.post("http://localhost:3000/api/query", query);
			const answer = (await result).data;
			setGraph(buildGraph(answer));
		} catch (e) {
			const message = "An error occurred during query";
			console.error(message, e);
			alert(message);
		}
	};
	const handleSave = settings => {
		setSettings(settings);
	};
	const handleClear = () => setSettings(null);

	return (
		<React.Fragment>
			<Grid container justify="center" alignItems="center">
				<Grid item>
					<Typography variant="h3">Graph Visualization Demo</Typography>
				</Grid>
			</Grid>
			<QueryForm
				onQuery={sendQuery}
			/>
			{graph && <VisualizationSettings onSave={handleSave} onClear={handleClear}/>}
			{settings && <Visualization graph={graph} settings={settings}/>}
		</React.Fragment>
	)
}

export default Index
