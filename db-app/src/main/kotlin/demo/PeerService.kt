package demo

import demo.config.PeerConfig
import demo.protocol.*
import demo.utils.*
import identify.pb.IdentifyOuterClass
import io.libp2p.core.*
import io.libp2p.core.crypto.KEY_TYPE
import io.libp2p.core.crypto.PrivKey
import io.libp2p.core.dsl.host
import io.libp2p.core.multiformats.Multiaddr
import io.libp2p.core.multiformats.Protocol
import io.libp2p.crypto.keys.RsaPrivateKey
import io.libp2p.crypto.keys.RsaPublicKey
import io.libp2p.discovery.MDnsDiscovery
import io.libp2p.host.MemoryAddressBook
import io.libp2p.mux.mplex.MplexStreamMuxer
import io.libp2p.protocol.Identify
import io.libp2p.protocol.IdentifyController
import io.libp2p.security.plaintext.PlaintextInsecureChannel
import io.libp2p.security.secio.SecIoSecureChannel
import io.libp2p.transport.tcp.TcpTransport
import org.slf4j.LoggerFactory
import java.io.File as JavaFile
import java.util.concurrent.CompletableFuture
import java.util.concurrent.ConcurrentHashMap

class PeerService(
    private val config: PeerConfig,
    queryHandler: QueryCallback,
    answerHandler: AnswerCallback
) {
    /**
     * The default instance of [QueryRespondProtocol].
     *
     * This is used in buildHost() and must be initialized first.
     */
    private val queryProtocol = QueryProtocol(queryHandler, answerHandler)

    /**
     * The current Identify protocol instance
     */
    private val identifyProtocol = Identify()

    /**
     * A [Host] instance representing this peer.
     */
    private val host: Host = buildHost()

    /**
     * An address book of all known peers
     */
    private val addressBook = host.addressBook

    /**
     * An identity book with the public keys of all known peers
     */
    private val identityBook = ConcurrentHashMap<PeerId, RsaPublicKey>()

    /**
     * AddressBook add helper.
     */
    private operator fun AddressBook.set(id: PeerId, addrs: List<Multiaddr>) {
        addAddrs(id, Long.MAX_VALUE, *addrs.toTypedArray())
    }

    /**
     * AddressBook remove helper.
     */
    private operator fun AddressBook.minusAssign(id: PeerId) {
        setAddrs(id, 0)
    }

    /**
     * Reads the private and public RSA keys.
     *
     * The keys may either be contained in the config or paths be provided which
     * can be used to load the keys.
     *
     * @returns A factory function which returns a [RsaPrivateKey] instance.
     */
    private fun readKeys(privateKey: File, publicKey: File): () -> PrivKey {
        logger.debug("Reading keys...")

        // Remove the key header and footer
        val privateKeyContent = privateKey.content
            .replace("\\n".toRegex(), "")
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
        val publicKeyContent = publicKey.content
            .replace("\\n".toRegex(), "")
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replace("-----END PUBLIC KEY-----", "")

        logger.debug("Processed private key: $privateKeyContent")
        logger.debug("Processed public key: $publicKeyContent")

        val privKey = privateKeyContent.toPrivateKey()
        val pubKey = publicKeyContent.toPublicKey()

        // Return a factory function which provides the RSA keys
        return { RsaPrivateKey(privKey, pubKey) }
    }

    /**
     * Configure a libp2p host based on [config].
     *
     * A DSL provided by jvm-libp2p is used
     * where the unary plus operator adds the given argument to an internal list
     */
    private fun buildHost() = host {
        // Define an identity for the new host
        identity {
            // Create a random identity if no keys are provided.
            // Otherwise read them in.
            if (config.privateKey == null && config.publicKey == null) {
                random(KEY_TYPE.RSA)
                logger.info("Generating random identity.")
            } else {
                factory = readKeys(config.privateKey!!, config.publicKey!!)
                logger.info("Loading identity based on provided keys.")
            }
        }
        // Define transport implementations
        transports {
            // Support plain TCP transport
            +::TcpTransport
        }
        // Define network address to listen on.
        network {
            // Listen on all addresses provided by the configuration key "listenAddresses"
            for (address in config.listenAddresses)
                listen(address)
        }
        // Defines the stream multiplexer implementation
        muxers {
            // Use the standard libp2p mplex implementation
            +::MplexStreamMuxer
        }
        // Define channels which can be used to communicate securely.
        secureChannels {
            // In production this implementation should be used for encryption
            // based on the exchanged keys of the peers.
            +::SecIoSecureChannel

            // This is a pseudo-secure channel which doesn't encrypt and
            // should not be used production.
            +::PlaintextInsecureChannel
        }
        // Define the support protocols by this host
        protocols {
            // Adds support for the Identify protocol defined by libp2p
            +identifyProtocol

            // Adds support for the demo query protocol
            +queryProtocol.first
            +queryProtocol.second
        }
    }

    /**
     * Adds a connection handler to the host which informs about newly connected peers.
     */
    fun Host.onNewConnection(handler: (Connection) -> Unit) {
        addConnectionHandler(ConnectionHandler.create(handler))
    }

    /**
     * Starts this host.
     *
     * @returns A future signalising when the service is started
     */
    fun start(): CompletableFuture<Void> {
        host.onNewConnection { conn ->
            logger.info("Connected to new peer: ${conn.remoteAddress()}")
        }
        return host
            .start()
            .thenAccept {
                logger.info("Started peer service.")
                logger.info("Listening on addresses: ${host.listenAddresses().joinToString()}")

                if (config.enableDiscovery) host.startDiscovery()

                for (bootstrapPeer in config.bootstrapPeers) {
                    val (peerId, multiaddr) = bootstrapPeer.toPeerIdAndAddr()
                    val peerInfo = PeerInfo(peerId, listOf(multiaddr))
                    requestIdentity(peerInfo)
                }
            }
    }

    private fun Host.startDiscovery() {
        val discoverer = MDnsDiscovery(this)
        discoverer.newPeerFoundListeners += ::handlePeer
        discoverer.start()
        logger.info("Discovery started")
    }

    /**
     * Handle newly discovered peer
     */
    private fun handlePeer(peerInfo: PeerInfo) {
        if (peerInfo.peerId != host.peerId) {
            logger.info("New peer connected: ${peerInfo.peerId}")
            addressBook[peerInfo.peerId].thenAccept { addresses ->
                if (addresses == null) {
                    addressBook[peerInfo.peerId] = peerInfo.addresses
                    requestIdentity(peerInfo)
                }
            }
        }
    }

    /**
     * Requests the identity of the new peer for further checks.
     */
    private fun requestIdentity(peerInfo: PeerInfo) {
        val peerAddresses = peerInfo.addresses.toTypedArray()
        identifyProtocol
            // Connect to peer with Identify protocol
            .dial(host, peerInfo.peerId, *peerAddresses)
            .controller
            // Await id from IdentifyController
            .thenCompose(IdentifyController::id)
            .thenAccept { id ->
                // Check if the identity book already contains this peer
                if (identityBook.containsKey(peerInfo.peerId)) {
                    checkIdentity(peerInfo.peerId, id)
                } else {
                    // If it doesn't, add the announced addresses to the address book
                    val listenPeerAddresses = id
                        .listenAddrsList
                        .map {
                            Multiaddr(it.toByteArray())
                        }
                        .toTypedArray()
                    addressBook.addAddrs(peerInfo.peerId, Long.MAX_VALUE, *listenPeerAddresses)
                }
            }
    }

    /**
     * Checks the identity.
     *
     * If the identity doesn't match, the peer will be removed from [addressBook].
     */
    private fun checkIdentity(peerId: PeerId, id: IdentifyOuterClass.Identify) {
        // Create an RSA public key representation
        val receivedKey = id
            .publicKey
            .toPublicKey()
            .toRsaPublicKey()
        val knownKey = identityBook[peerId]
        if (knownKey != null && knownKey != receivedKey) {
            // Remove peer as its identity has changed
            addressBook -= peerId
            logger.warn("Peer $peerId has a different identity and will be ignored for now")
        }
    }

    /**
     * Stores this peer's id and addresses in a json file.
     *
     * The file has a key "peerId" containing the peer id and
     * a key "addresses" containing an array of addresses
     * this peer is listening on.
     *
     * @param file The file to write to
     */
    fun storeAddress(file: JavaFile) {
        val info = SimplePeerInfo(
            host.peerId,
            host.listenAddresses(),
            host.privKey.publicKey() as RsaPublicKey
        )
        file.writeText(info.toJson())
        logger.info("Written info file to $file")
    }

    /**
     * Connects to the target address for the querying.
     *
     * @param targetAddress The target's multiaddress
     * @returns A future returning a [QueryController]
     */
    fun connectToQuery(targetAddress: Multiaddr): CompletableFuture<out QueryController> {
        return queryProtocol
            .first
            .dial(host, targetAddress)
            .controller
    }

    /**
     * Connects to the target address for answering to a query.
     *
     * @param targetAddress The target's multiaddress
     * @returns A future returning a [AnswerController]
     */
    fun connectToAnswer(targetAddress: Multiaddr): CompletableFuture<out AnswerController> {
        return queryProtocol
            .second
            .dial(host, targetAddress)
            .controller
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}
