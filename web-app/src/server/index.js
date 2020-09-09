import {parse} from "url";
import {readFile} from "fs";
import {promisify} from "util";
import next from "next";
import express from "express";
import bodyParser from "body-parser";
import {program} from "commander";
import PeerService from "../PeerService";
import QueryProtocol from "../protocol/QueryProtocol";
import QueryHandler from "./QueryHandler";

const readFileAsync = promisify(readFile);
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
let peer;

program
	.requiredOption(
		"-i --info-json <path>",
		"Path to a peer-describing JSON info file",
		String
	);

program.parse(process.argv);

async function readDbInfoFile() {
	const data = await readFileAsync(program.infoJson);
	return JSON.parse(data.toString());
}

async function main() {
	const dbInfo = await readDbInfoFile();
	const config = {
		bootstrapPeers: dbInfo.listenAddresses
	};

	// Start peer service
	peer = new PeerService(config);
	await peer.start();

	// Print addresses
	const host = await peer.host;
	const peerId = host.peerId.toB58String();
	const addresses = host.transportManager.getAddrs().map(addr => `${addr}/p2p/${peerId}`);
	console.log("Started peer service");
	console.log("Listening on addresses:", addresses);

	const queryHandler = new QueryHandler(host, dbInfo);
	// Handle incoming Answer messages
	host.handle(QueryProtocol.RESPOND_ID, queryHandler.handleIncomingProtocol);

	// Set up web server
	await app.prepare();
	const webServer = express();
	// Automatically parse POST data as JSON when Content-Type header is set to application/json
	webServer.use(bodyParser.json());
	// Handle chunks manually as Next.js seems to be buggy at this point.
	webServer.use("/_next/static/chunks", express.static(".next/static/chunks"));
	// Register REST API route receiving queries from browser
	webServer.post("/api/query", queryHandler.handleQueryRequest);
	// Let Next.js handle other requests
	webServer.get("*", handle);
	// Begin listening on port 3000 for HTTP connections
	webServer.listen(3000, err => {
		if (err) throw err
		console.log('> Web server ready on http://localhost:3000');
	});
}

main();
