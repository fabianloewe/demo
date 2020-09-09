import QueryProtocol from "../protocol/QueryProtocol";

class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject
			this.resolve = resolve
		})
	}
}

export default class QueryHandler {
	constructor(host, dbInfo) {
		this.host = host;
		this.dbInfo = dbInfo;
		this.answer = new Deferred();
	}

	/**
	 * Handle incoming stream with QueryProtocol.
	 *
	 * @param stream Incoming stream
	 */
	handleIncomingProtocol = ({stream}) => {
		console.log("Established new Query protocol connection...");
		const queryProtocol = new QueryProtocol(stream);
		// Await answer and store it in this.answer
		queryProtocol
			.awaitAnswer()
			.then(answer => this.answer.resolve(answer))
			.catch(error => this.answer.reject(error));
		console.log("Got answer");
	}

	/**
	 * Handle the received query request from browser.
	 *
	 * @param req HTTP request
	 * @param res HTTP response
	 * @returns {Promise<*>}
	 */
	handleQueryRequest = async (req, res) => {
		// Establish query protocol
		const protocolIds = [QueryProtocol.SEND_ID, QueryProtocol.RESPOND_ID];
		const {stream} = await this.host.dialProtocol(this.dbInfo.listenAddresses[0], protocolIds);
		const queryProtocol = new QueryProtocol(stream);
		// Send query
		await queryProtocol.query(req.body);
		// Await answer from handleIncomingProtocol
		const answer = await this.answer.promise;
		// Reset answer
		this.answer = new Deferred();
		// Send answer as JSON to browser
		return res
			.status(200)
			.json(answer)
			.end();
	};
}
