import React from 'react';
import axios from "axios";
import QueryForm from "../components/QueryForm";
import VisualizationSettings from "../components/VisualizationSettings";
import Visualization from "../components/Visualization";
import buildGraph from "../src/graph";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Index = () => {
	const [isQuerySent, setIsQuerySent] = React.useState(false);
	const [areSettingsSaved, setAreSettingsSaved] = React.useState(false);
	const [graph, setGraph] = React.useState(null);
	const [settings, setSettings] = React.useState(null);

	const sendQuery = async query => {
		try {
			const result = axios.post("http://localhost:3000/api/query", query);
			setIsQuerySent(true);
			const answer = (await result).data;
			setGraph(buildGraph(answer));
		} catch (e) {
			console.error("An error occurred during query", e);
		}
	};
	const handleSave = settings => {
		settings.height = 500;
		settings.width = 500;
		setSettings(settings);
		setAreSettingsSaved(true);
	};
	const handleClear = () => setAreSettingsSaved(false);

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
			{isQuerySent && <VisualizationSettings onSave={handleSave} onClear={handleClear}/>}
			{areSettingsSaved && <Visualization graph={graph} settings={settings}/>}
		</React.Fragment>
	)
}

export default Index
