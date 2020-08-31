import Libp2p from "libp2p";
import TCP from "libp2p-tcp";
import SECIO from "libp2p-secio";
import MPLEX from "libp2p-mplex";
import Bootstrap from "libp2p-bootstrap";
import QueryProtocol from "./protocol/QueryProtocol";

/**
 * The JavaScript implementation of the PeerService
 */
export default class PeerService {
	/**
	 * Initializes this service with the provided config.
	 *
	 * @param config A configuration object similar to the PeerConfig class
	 */
	constructor(config) {
		this.config = config;
		this.host = this.createHost();
	}

	/**
	 * Creates a new libp2p instance based on the config.
	 *
	 * @returns {Promise<Libp2p>} A promise resolving to libp2p instance.
	 */
	async createHost() {
		return Libp2p.create({
			addresses: {
				listen: this.config.listenAddresses
			},
			modules: {
				transport: [TCP],
				connEncryption: [SECIO],
				streamMuxer: [MPLEX],
				peerDiscovery: [Bootstrap],
			},
			config: {
				relay: {                   // Circuit Relay options (this config is part of libp2p core configurations)
					enabled: true,           // Allows you to dial and accept relayed connections. Does not make you a relay.
					hop: {
						enabled: true,         // Allows you to be a relay for other peers
						active: true           // You will attempt to dial destination peers if you are not connected to them
					}
				},
				peerDiscovery: {
					autoDial: false, // Auto connect to discovered peers (limited by ConnectionManager minConnections)
					// The `tag` property will be searched when creating the instance of your Peer Discovery service.
					// The associated object, will be passed to the service when it is instantiated.
					bootstrap: {
						enabled: true,
						interval: 60e3,
						list: this.config.bootstrapPeers // provide array of multiaddrs
					}
				}
			}
		});
	}

	/**
	 * Starts this service.
	 *
	 * @returns {Promise<*>} A promise signaling when the service is started.
	 */
	async start(connectToPeers = true) {
		console.log("Starting service with config:", this.config);

		const host = await this.host;
		host.on('peer:discovery', peerId => {
			console.log('Discovered:', peerId.toB58String()); // Log discovered peer
		});
		host.connectionManager.on('peer:connect', conn => {
			console.log('Received connection from:', conn.remotePeer.toB58String()) // Log connected peer
		});

		return host
			.start()
			.then(() => {
				if (connectToPeers) this.connectToPeers();
			});
	}

	/**
	 * Stops this service.
	 *
	 * @returns {Promise<*>} A promise signaling when the service is stopped.
	 */
	async stop() {
		console.log("Stopping service..");
		return (await this.host).stop();
	}

	/**
	 * Connects to all bootstrap peers.
	 *
	 * @returns {Promise<stream[]>} A promise containing an array of one stream per connected peer.
	 */
	async connectToPeers() {
		const host = await this.host;

		const dialPeer = async peer => {
			console.log("Connecting to peer:", peer);
			const conn = await host.dial(peer);
			console.log("Connection established");
			return conn.stream;
		};

		const circuitPeers = this.config.bootstrapPeers
			.filter(peer => peer.includes("/p2p-circuit/"));

		const streamPromises = this.config.bootstrapPeers
			.filter(peer => !peer.includes("/p2p-circuit/"))
			.map(dialPeer);

		return Promise.all(streamPromises).then(async streams => {
			const circuitStreams = await Promise.all(circuitPeers.map(dialPeer));
			return streams.concat(circuitStreams);
		});
	}
}
