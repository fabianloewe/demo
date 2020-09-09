import { demo } from "lib";
import pipe from "it-pipe";
import lengthPrefixed from "it-length-prefixed";
import {take} from "streaming-iterables";
import toBuffer from "it-buffer";

/**
 * The decoder function for GraphData.
 *
 * @param answer
 * @returns {null|GraphData}
 */
function decodeGraphData(answer) {
	const isGraphData = () => {
		return answer.data.type_url.includes("demo.protocol.GraphData")
	};
	if (answer.type !== "graph" && !isGraphData()) return null;
	else return demo.protocol.GraphData.decode(answer.data.value);
}

export default class QueryProtocol {
	/**
	 * Protocol identifier for sending for libp2p.
	 *
	 * @type {string}
	 */
	static SEND_ID = "/demo/query/send/1.0.0";

	/**
	 * Protocol identifier for sending for libp2p.
	 *
	 * @type {string}
	 */
	static RESPOND_ID = "/demo/query/respond/1.0.0";

	/**
	 * Default decoders for data field of Answer messages.
	 *
	 * A decoder must return null if it cannot decode the data field.
	 * Otherwise it must return the decoded data.
	 *
	 * @type {[function(Answer): (null|*)]}
	 */
	static defaultDataDecoders = [
		decodeGraphData
	];

	/**
	 * Creates a new QueryProtocol instance which send Query messages and receive Answer messages.
	 *
	 * In this demo only GraphData is supported so no custom decoders will be added.
	 *
	 * @param stream The stream to send messages to and receive messages from.
	 * @param customDataDecoders {[function(Answer): (null|*)]} Custom data decoders which get appended to the default data decoders.
	 */
	constructor(stream, customDataDecoders = []) {
		this.stream = stream;
		this.dataDecoders = [...QueryProtocol.defaultDataDecoders, ...customDataDecoders];
	}

	/**
	 * Transforms the query object into its Protocol Buffers equivalent (Query.proto) and
	 * sends it to the connected peer.
	 *
	 * @param queryObject
	 */
	query = async (queryObject) => {
		console.log("Sending query...");
		const query = demo.protocol.Query
			.encode(queryObject)
			.finish();
		return pipe(
			// Pipe the query message
			[query],
			// Prefix it with its length
			lengthPrefixed.encode(),
			// The stream sends it
			this.stream.sink
		);
	};

	/**
	 * Decodes the data field of an Answer message.
	 *
	 * @param answer The answer message
	 * @returns The decoded data
	 */
	decodeData(answer) {
		for (const decoder of this.dataDecoders) {
			const data = decoder(answer);
			// Return once one decoder has been able to decode the data
			if (data !== null) return data;
		}
	}

	/**
	 * Awaits an Answer message.
	 *
	 * Before calling this method the query method should be called.
	 * Otherwise no Answer message will be received because nothing has been queried.
	 *
	 * @returns {Promise<object>} A promise resolving to the JSON representation of an Answer message once it arrived.
	 */
	awaitAnswer = () => new Promise((resolve, reject) => {
		const decodeAnswer = async source => {
			for await (const message of source) {
				// Decode answer
				let answer = demo.protocol.Answer.decode(message);
				// Decode data field in answer because this isn't handled by protobuf.js
				const data = this.decodeData(answer);
				// Create a copy of the answer because the decoded data gets assigned
				answer = Object.assign({}, {
					type: answer.type,
					data: data.toJSON()
				});
				console.log("Got answer:", answer);
				resolve(answer);
			}
		};

		console.log("Awaiting answer...");
		try {
			pipe(
				// Read from stream
				this.stream.source,
				// Read the prefixed message length
				lengthPrefixed.decode(),
				take(1),
				// Convert the bytes to a Buffer
				toBuffer,
				// Decode the message expecting an Answer message
				decodeAnswer
			);
		} catch (e) {
			reject(e);
		}
	});
}
