package demo

import demo.config.PeerConfig
import demo.protocol.*
import demo.utils.File
import io.libp2p.core.*
import io.libp2p.core.crypto.KEY_TYPE
import io.libp2p.core.crypto.PrivKey
import io.libp2p.core.dsl.host
import io.libp2p.core.multiformats.Multiaddr
import io.libp2p.crypto.keys.RsaPrivateKey
import io.libp2p.mux.mplex.MplexStreamMuxer
import io.libp2p.protocol.Identify
import io.libp2p.security.plaintext.PlaintextInsecureChannel
import io.libp2p.security.secio.SecIoSecureChannel
import io.libp2p.transport.tcp.TcpTransport
import io.libp2p.transport.ws.WsTransport
import org.slf4j.LoggerFactory
import java.io.File as JavaFile
import java.security.KeyFactory
import java.security.spec.PKCS8EncodedKeySpec
import java.security.spec.X509EncodedKeySpec
import java.util.*
import java.util.concurrent.CompletableFuture

class PeerService(
    private val config: PeerConfig,
    queryHandler: QueryCallback,
    answerHandler: AnswerCallback
) {
    /**
     * The default instance of [QueryProtocol].
     *
     * This is used in buildHost() and must be initialized first.
     */
    private val queryProtocol = QueryProtocol(queryHandler, answerHandler).Binding()

    /**
     * A [Host] instance representing this peer.
     */
    private val host: Host = buildHost()

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

        val kf = KeyFactory.getInstance("RSA")

        val keySpecPKCS8 = PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKeyContent))
        val privKey = kf.generatePrivate(keySpecPKCS8)

        val keySpecX509 = X509EncodedKeySpec(Base64.getDecoder().decode(publicKeyContent))
        val pubKey = kf.generatePublic(keySpecX509)

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
            +Identify()

            // Adds support for the demo query protocol
            +queryProtocol
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
        val jsonAddresses = host
            .listenAddresses()
            .joinToString(prefix = "[", postfix = "]") { "\"$it\"" }

        file.writeText("""
            {
                "peerId": "${host.peerId}",
                "addresses": $jsonAddresses
            }
        """.trimIndent())
        logger.info("Written info file to $file")
    }

    /**
     * Connects to the target address with the query protocol.
     *
     * @param targetAddress The target's multiaddress
     * @returns A future returning a [QueryProtocolController]
     */
    fun dialTo(targetAddress: Multiaddr): CompletableFuture<out QueryProtocolController> {
        return queryProtocol.dial(host, targetAddress).controller
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}