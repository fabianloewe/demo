import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	Box,
	Container,
	Typography,
	Paper,
	Radio,
	RadioGroup,
	Grid,
	FormGroup,
	FormControlLabel,
	Button,
	InputBase,
	AppBar,
	Tab,
	Tabs,
	Tooltip,
	TextField,
	Checkbox
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	settings: {
		maxWidth: 800,
		margin: 'auto',
		textAlign: 'center',
	},
	paper: {
		width: '100%',
		margin: theme.spacing(2),
		padding: theme.spacing(2)
	},
	tabPanel: {
		flexGrow: 1,
		width: '100%',
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
	},
	option: {
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		borderColor: theme.palette.text.secondary,
		//backgroundColor: theme.palette.background.paper,
		//color: theme.palette.text.secondary,
	},
	propertyStyle: {
		display: 'flex',
		alignItems: 'center',
	},
	rightSpace: {
		marginRight: theme.spacing(1),
	},
	buttons: {
		paddingTop: theme.spacing(2)
	},
}));

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}


export default function VisualizationSettings({onSave, onClear}) {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);
	const [dimension, setDimension] = React.useState("3D");
	const [showProperties, setShowProperties] = React.useState(true);
	const [centerPropertiesView, setCenterPropertiesView] = React.useState(false);
	const [enableShiftSelect, setEnableShiftSelect] = React.useState(true);
	const [enableScrollSelect, setEnableScrollSelect] = React.useState(false);
	const [enableCut, setEnableCut] = React.useState(true);
	const [vertexStyle, setVertexStyle] = React.useState("round");
	const [vertexStyleProp, setVertexStyleProp] = React.useState("");
	const [edgeStyle, setEdgeStyle] = React.useState("nothing");
	const [edgeStyleProp, setEdgeStyleProp] = React.useState("");
	const [enableZoom, setEnableZoom] = React.useState(false);
	const [controlType, setControlType] = React.useState("trackball");

	const is3D = dimension === "3D";

	const handleTabValueChange = (e, v) => setTabValue(v);
	const handleDimensionChange = e => setDimension(e.target.value);
	const handleShowPropertiesChange = e => {
		setShowProperties(e.target.checked);
		setCenterPropertiesView(false);
	}
	const handleCenterPropertiesViewChange = e => setCenterPropertiesView(e.target.checked);
	const handleEnableShiftSelectChange = e => setEnableShiftSelect(e.target.checked);
	const handleEnableScrollSelectChange = e => setEnableScrollSelect(e.target.checked);
	const handleEnableCutChange = e => setEnableCut(e.target.checked);
	const handleVertexStyleChange = e => setVertexStyle(e.target.value);
	const handleVertexStylePropChange = e => setVertexStyleProp(e.target.value);
	const handleEdgeStyleChange = e => setEdgeStyle(e.target.value);
	const handleEdgeStylePropChange = e => setEdgeStyleProp(e.target.value);
	const handleEnableZoomChange = e => setEnableZoom(e.target.checked);
	const handleControlType = (e, v) => setControlType(v);

	const handleSave = () => {
		onSave({
			dimension,
			showProperties,
			centerPropertiesView,
			enableShiftSelect,
			enableScrollSelect,
			vertexStyle,
			vertexStyleProp: vertexStyleProp !== "" ? vertexStyleProp : undefined,
			edgeStyle,
			edgeStyleProp: edgeStyleProp !== "" ? edgeStyleProp : undefined,
			enableZoom,
			controlType,
			enableCut
		})
	};
	const handleClear = () => {
		setDimension(null);
		setVertexStyle("round");
		setVertexStyleProp("");
		setEdgeStyle("nothing");
		setEdgeStyleProp("");
		onClear();
	};

	return (
		<Grid
			container
			className={classes.settings}
			justify="center"
			direction="column"
		>
			<Paper
				component="main"
				className={classes.paper}
				elevation={3}
			>
				<Typography variant="h6">Visualization Settings</Typography>
				<div className={classes.root}>
					<AppBar position="static" color="default">
						<Tabs
							value={tabValue}
							onChange={handleTabValueChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example"
						>
							<Tab label="Basic Settings" {...a11yProps(0)} />
							<Tab label="Vertex Style" {...a11yProps(1)} />
							<Tab label="Edge Style" {...a11yProps(2)} />
							<Tab label="2D Settings" {...a11yProps(3)} />
							<Tab label="3D Settings" {...a11yProps(4)} />
						</Tabs>
					</AppBar>
					<TabPanel value={tabValue} index={0}>
						<Grid container>
							<Grid item>
								<RadioGroup
									aria-label="dimension"
									name="dimension"
									value={dimension}
									onChange={handleDimensionChange}
								>
									<FormControlLabel value="2D" control={<Radio/>} label="Use 2 Dimensions"/>
									<FormControlLabel value="3D" control={<Radio/>} label="Use 3 Dimensions"/>
								</RadioGroup>
							</Grid>
							<Grid item>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={showProperties}
												onChange={handleShowPropertiesChange}
												name="show-properties"
												color="primary"
											/>
										}
										label="Show properties"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={centerPropertiesView}
												onChange={handleCenterPropertiesViewChange}
												name="center-properties-view"
												color="primary"
												disabled={!showProperties}
											/>
										}
										label="Center properties view"
									/>
								</FormGroup>
							</Grid>
							<Grid item>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={enableShiftSelect}
												onChange={handleEnableShiftSelectChange}
												name="multi-select-shift"
												color="primary"
											/>
										}
										label="Enable multi-select with Shift-key"
									/>
									<Tooltip title="Enables cutting after selection when right-clicking in the background">
										<FormControlLabel
											control={
												<Checkbox
													checked={enableCut}
													onChange={handleEnableCutChange}
													name="cut"
													color="primary"
												/>
											}
											label="Enable cut"
										/>
									</Tooltip>
								</FormGroup>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={tabValue} index={1}>
						<RadioGroup
							aria-label="vertex-style"
							name="vertex-style"
							value={vertexStyle}
							onChange={handleVertexStyleChange}
						>
							<FormControlLabel value="round" control={<Radio/>} label="Show sphere"/>
							<FormControlLabel value="label" control={<Radio/>} label="Show label"/>
							<FormControlLabel value="property" control={<Radio/>} label={
								<Box className={classes.propertyStyle}>
									<p className={classes.rightSpace}>Show property: </p>
									<TextField
										placeholder="Property Name"
										disabled={vertexStyle !== "property"}
										value={vertexStyleProp}
										onChange={handleVertexStylePropChange}
									/>
								</Box>
							}/>
						</RadioGroup>
					</TabPanel>
					<TabPanel value={tabValue} index={2}>
						<RadioGroup
							aria-label="edge-style"
							name="edge-style"
							value={edgeStyle}
							onChange={handleEdgeStyleChange}
						>
							<FormControlLabel value="nothing" control={<Radio/>} label="Show circle"/>
							<FormControlLabel value="direction" control={<Radio/>} label="Show direction"/>
							<FormControlLabel value="label" control={<Radio/>} label="Show label"/>
							<FormControlLabel value="property" control={<Radio/>} label={
								<Box className={classes.propertyStyle}>
									<p className={classes.rightSpace}>Show property: </p>
									<TextField
										placeholder="Property Name"
										disabled={edgeStyle !== "property"}
										value={edgeStyleProp}
										onChange={handleEdgeStylePropChange}
									/>
								</Box>
							}/>
						</RadioGroup>
					</TabPanel>
					<TabPanel value={tabValue} index={3}>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={enableScrollSelect}
										onChange={handleEnableScrollSelectChange}
										name="multi-select-scroll"
										color="primary"
										disabled={is3D}
									/>
								}
								label="Enable multi-select with scrolling"
							/>
						</FormGroup>
					</TabPanel>
					<TabPanel value={tabValue} index={4}>
						<Grid container>
							<Grid item>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={enableZoom}
												onChange={handleEnableZoomChange}
												name="multi-select-shift"
												color="primary"
												disabled={!is3D}
											/>
										}
										label="Enable zoom to node"
									/>
								</FormGroup>
							</Grid>
							<Grid item>
								<RadioGroup
									aria-label="control-type"
									name="control-type"
									value={controlType}
									onChange={handleControlType}
								>
									<FormControlLabel
										value="trackball"
										control={<Radio/>}
										label="Enable trackball control"
										disabled={!is3D}
									/>
									<FormControlLabel
										value="fly"
										control={<Radio/>}
										label="Enable fly control"
										disabled={!is3D}
									/>
									<FormControlLabel
										value="orbit"
										control={<Radio/>}
										label="Enable orbit control"
										disabled={!is3D}
									/>
								</RadioGroup>
							</Grid>
						</Grid>
					</TabPanel>
				</div>
				<Grid container justify="space-between" className={classes.buttons}>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSave}
						>
							Save
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
