import React from "react";
import {Button, TextField, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	queryForm: {
		maxWidth: 800,
		margin: 'auto',
		marginTop: 40,
		textAlign: 'center',
	},
	paper: {
		width: '100%',
		margin: theme.spacing(2),
		padding: theme.spacing(2)
	},
	queries: {
		paddingTop: theme.spacing(2)
	},
	buttons: {
		paddingTop: theme.spacing(2)
	},
	list: {
		listStyle: 'none',
		width: '95%',
		padding: 0,
		marginBottom: 0,
		borderRadius: '0 0 4px 4px',
	},
}));

const queries = {
	"vertices": "MATCH (a) RETURN a",
	"all": "MATCH (a)-[r]-(b) RETURN a, r, b"
}

export default function QueryForm({onQuery}) {
	const classes = useStyles();

	const [query, setQuery] = React.useState("");

	const codeMirrorOptions = {
		mode: "cypher",
		theme: "material",
		smartIndent: true,
		lineNumbers: true,
		matchBrackets: true
	};

	const handleListClick = queryKey => () => setQuery(queries[queryKey]);
	const handleQuery = e => setQuery(e.target.value);
	const handleSend = () => onQuery({
		language: "cypher",
		query: query
	});

	const handleClear = () => setQuery("");

	return (
		<Grid
			container
			className={classes.queryForm}
			justify="center"
			direction="column"
		>
			<Paper
				component="main"
				className={classes.paper}
				elevation={3}
			>
				<Grid container justify="space-between" className={classes.queries}>
					<Grid item xs={6} md={4}>
						<Typography variant="h6">Example Queries</Typography>
						<List className={classes.list} component="nav" aria-label="main mailbox folders">
							<ListItem button onClick={handleListClick("vertices")}>
								<ListItemText primary="Get all vertices"/>
							</ListItem>
							<ListItem button onClick={handleListClick("all")}>
								<ListItemText primary="Get all vertices and edges"/>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={6} md={8}>
						<Typography variant="h6">Current Query</Typography>
						<TextField
							multiline
							fullWidth
							variant="outlined"
							rows={4}
							label="Enter Cypher query"
							value={query}
							onChange={handleQuery}
						/>
					</Grid>
				</Grid>
				<Grid container justify="space-between" className={classes.buttons}>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSend}
						>
							Send
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleClear}
						>
							Clear
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}
