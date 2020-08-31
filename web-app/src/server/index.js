import { parse } from "url";
import { readFile } from "fs/promises";
import next from "next";
import express from "express";
import bodyParser from "body-parser";
import PeerService from "../PeerService";
import QueryProtocol from "../protocol/QueryProtocol";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
let peer;

async function readDbInfoFile() {
	const data = await readFile("../db-app-info.json");
	return JSON.parse(data.toString());
}

async function handleIncomingProtocol({stream}) {
	console.log("Established new Query protocol connection...");
	const queryProtocol = new QueryProtocol(stream);
	const answer = await queryProtocol.awaitAnswer();
	console.log("Got answer:", answer);
}

async function main() {
	const dbInfo = await readDbInfoFile();
	const config = {
		bootstrapPeers: dbInfo.addresses
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

	// Handle incoming Answer messages
	host.handle(QueryProtocol.ID, handleIncomingProtocol);

	// Set up web server
	await app.prepare();
	const webServer = express();
	// Automatically parse POST data as JSON when Content-Type header is set to application/json
	webServer.use(bodyParser.json());
	// Handle chunks manually as Next.js seems to be buggy at this point.
	webServer.use("/_next/static/chunks", express.static(".next/static/chunks"));
	// Register REST API route receiving queries from browser
	webServer.post("/api/query", async (req, res) => {
		// Establish query protocol
		const {stream} = await host.dialProtocol(dbInfo.addresses[0], QueryProtocol.ID);
		const queryProtocol = new QueryProtocol(stream);
		await queryProtocol.query(req.body);
		const answer = await queryProtocol.awaitAnswer();
		return res
			.status(200)
			.json(answer)
			.end();
	});
	// Let Next.js handle other requests
	webServer.get("*", handle);
	// Begin listening on port 3000 for HTTP connections
	webServer.listen(3000, err => {
		if (err) throw err
		console.log('> Web server ready on http://localhost:3000');
	});
}

main();
