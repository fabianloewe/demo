package demo

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.groups.OptionGroup
import com.github.ajalt.clikt.parameters.groups.cooccurring
import com.github.ajalt.clikt.parameters.options.*
import com.github.ajalt.clikt.parameters.types.file
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.long
import com.github.ajalt.clikt.parameters.types.path
import demo.config.DatabaseConfig
import demo.config.PeerConfig
import demo.protocol.*
import demo.utils.*
import io.libp2p.core.PeerId
import io.libp2p.core.Stream
import io.libp2p.core.multiformats.Multiaddr
import io.libp2p.core.multiformats.Protocol
import org.slf4j.LoggerFactory
import java.nio.file.Path
import java.nio.file.Paths
import java.util.concurrent.CompletableFuture
import kotlin.concurrent.fixedRateTimer

/**
 * Defines an commandline option group.
 *
 * In an option group all required options must be given or none at all.
 */
class KeysOptions : OptionGroup() {
    val privateKey: File? by option(
        "--priv", "--private-key",
        help = "Path to the private key"
    ).path().convert { File.Path(it) }.required()

    val publicKey: File? by option(
        "--pub", "--public-key",
        help = "Path to the public key"
    ).path().convert { File.Path(it) }.required()
}

/**
 * Builds configurations from commandline arguments and
 * starts services.
 *
 * This is the main entry point of this database app demo.
 */
class Main : CliktCommand() {
    private val listenAddresses: List<String> by option(
        "-l", "--listen-address",
        help = "multiaddress to listen on for incoming libp2p connections"
    ).multiple(listOf("/ip4/127.0.0.1/tcp/0"))

    private val publishAddress: String? by option(
        "-p", "--publish-address",
        help = "Public multiaddress of this host to show to other peers"
    )

    private val keys by KeysOptions().cooccurring()

    private val storeDir: Path by option(
        "-d", "--db-dir",
        help = "Path to a directory where the database can be stored"
    )
        .path(mustExist = true, canBeFile = false, mustBeWritable = true)
        .convert { it.toAbsolutePath().normalize() }
        .default(Paths.get(System.getProperty("user.dir")))

    private val dbInitScript: File? by option(
        "-i", "--init-db",
        help = "Path to an initialization Cypher script"
    ).path(mustExist = true).convert { File.Path(it) }

    private val clearDb: Boolean by option(
        "--clear-db",
        help = "Clears the database"
    ).flag()

    private val boltPort: Int? by option(
        "--bolt-port",
        help = "Port for Bolt connector"
    ).int()

    private val selfDescJsonPath: java.io.File? by option(
        "--self-json",
        help = "Path to self-describing JSON file"
    ).file()

    private val enableDiscovery: Boolean by option(
        "--enable-discovery",
        help = "Enable mDNS discovery"
    ).flag()

    private val bootstrapAddresses: List<Multiaddr> by option(
        "--bootstrap-addr",
        help = "multiaddress to connect to after initialization"
    ).convert { Multiaddr(it) }.multiple()

    private val bootstrapJsonPath: List<java.io.File> by option(
        "--bootstrap-json",
        help = "Path to JSON file containing peerId and listenAddresses keys"
    ).file().multiple()

    private val enableSync: Boolean by option(
        "-s", "--sync", "--enable-sync",
        help = "Enable synchronization of database with bootstrap peers"
    ).flag()

    private val syncInterval: Long by option(
        "--sync-interval",
        help = "Interval in milliseconds for synchronizing database with bootstrap peers"
    ).long().default(300_000)

    private val syncQuery: String by option(
        "--sync-query",
        help = "Query to be sent for synchronizing database with bootstrap peers"
    ).default("MATCH (a)-[r]-(b) RETURN a, r, b")

    private val hypergraphVertexLabel by option(
        "--hgvl", "--hypergraph-vertex-label",
        help = "Set vertex label for hypergraph simulation"
    ).default(HYPERGRAPH_VERTEX_LABEL)

    private val hypergraphEdgeLabel by option(
        "--hgel", "--hypergraph-edge-label",
        help = "Set edge label for hypergraph simulation"
    ).default(HYPERGRAPH_EDGE_LABEL)

    private val specializedHypergraphMetaLabel by option(
        "--shgml", "--specialized-hypergraph-meta-label",
        help = "Set meta-edge label for specialized hypergraph simulation"
    ).default(SPECIALIZED_HYPERGRAPH_META_LABEL)

    private val specializedHypergraphInLabel by option(
        "--shgil", "--specialized-hypergraph-in-label",
        help = "Set incoming edge to hyperedge label for specialized hypergraph simulation"
    ).default(SPECIALIZED_HYPERGRAPH_EDGE_IN_LABEL)

    private val specializedHypergraphOutLabel by option(
        "--shgol", "--specialized-hypergraph-out-label",
        help = "Set outgoing edge from hyperedge label for specialized hypergraph simulation"
    ).default(SPECIALIZED_HYPERGRAPH_EDGE_OUT_LABEL)

    /**
     * Lazily creates the [DatabaseConfig] on request.
     */
    private val dbConfig by lazy {
        DatabaseConfig(
            storeDir,
            hypergraphVertexLabel,
            hypergraphEdgeLabel,
            specializedHypergraphMetaLabel,
            specializedHypergraphInLabel,
            specializedHypergraphOutLabel,
            dbInitScript,
            boltPort,
            clearDb
        )
    }

    /**
     * Lazily create the [DatabaseService] on request.
     */
    private val dbService by lazy {
        DatabaseService(dbConfig)
    }

    /**
     * Lazily create the [AnswerFactory].
     */
    private val answerFactory by lazy {
        AnswerFactory(
            hypergraphEdgeLabel,
            specializedHypergraphOutLabel,
            specializedHypergraphInLabel,
            specializedHypergraphMetaLabel
        )
    }

    /**
     * The query handler.
     *
     * It returns a reference to the [DatabaseService.process] method
     * which can handle it.
     */
    private val queryHandler: QueryCallback
        get() = { stream, query ->
            try {
                logger.debug("Recevied query message: $query")
                // Let DatabaseService process the query
                dbService.process(query) { result ->
                    sendResult(stream, result).thenAccept { stream.close() }
                }
            } catch (e: Throwable) {
                logger.error("An error occurred during query processing", e)
            }
        }

    /**
     * Sends the result as an [AnswerOuterClass.Answer] message over the stream.
     */
    private fun sendResult(stream: Stream, result: ResultValues): CompletableFuture<Unit> {
        // Convert result to Answer message.
        val answer = answerFactory.create(result)
        val multiaddr = Multiaddr(stream.connection.remoteAddress(), stream.remotePeerId())
        return peerService.connectToAnswer(multiaddr).thenCompose { controller ->
            logger.debug("Sending answer: $answer")
            controller.sendAnswer(answer)
        }
    }

    /**
     * The query handler.
     *
     * It writes the content of the Answer message to the database.
     */
    private val answerHandler: AnswerCallback get() = { stream, answer ->
        try {
            logger.debug("Received answer message: $answer")
            val data = answer.data.unpack(GraphDataOuterClass.GraphData::class.java)
            dbService.writeGraphData(stream.remotePeerId(), data)
        } catch (e: Throwable) {
            logger.error("An error occurred during processing answer", e)
        }
    }

    /**
     * Lazily creates the [PeerConfig] on request.
     */
    private val peerConfig by lazy {
        val bootstrapPeers = bootstrapAddresses + bootstrapJsonPath.flatMap { jsonFile ->
            val peerInfo = SimplePeerInfo.from(jsonFile)
            val peerId = PeerId.fromBase58(peerInfo.peerId)
            peerInfo
                .listenAddresses
                .map {
                    val multiaddr = Multiaddr(it)
                    // If multiaddr doesn't includes the peer id, add it
                    if (multiaddr.has(Protocol.P2P) || multiaddr.has(Protocol.IPFS)) multiaddr
                    else Multiaddr(multiaddr, peerId)
                }
        }
        PeerConfig(
            listenAddresses,
            keys?.privateKey,
            keys?.publicKey,
            publishAddress,
            bootstrapPeers.distinct(),
            selfDescJsonPath,
            enableDiscovery
        )
    }

    /**
     * Lazily create the [PeerService] on request.
     */
    private val peerService by lazy {
        PeerService(peerConfig, queryHandler, answerHandler)
    }

    /**
     * Called after commandline argument evaluation.
     */
    override fun run() {
        // This triggers the configs and services creation and
        // finally starts the services.
        dbService.start()
        peerService.start().thenAccept {
            selfDescJsonPath?.let { file ->
                // Store the peer address in a file for other peers to read
                peerService.storeAddress(file)
            }

            if (enableSync) fixedRateTimer(period = syncInterval) { sync() }
        }

        // The app is initialized, so leave this thread but keep running
        Thread.currentThread().join()
    }

    /**
     * Executes a synchronization with every bootstrap peer.
     */
    private fun sync() {
        for (peerAddress in peerConfig.bootstrapPeers) {
            logger.debug("Synchronizing with peer $peerAddress using query: $syncQuery")
            peerService.connectToQuery(peerAddress).handle { controller, error ->
                if (error != null) {
                    logger.error("An error occurred during synchronization", error)
                } else {
                    controller.query(syncQuery,"cypher", listOf())
                    logger.debug("Sync query sent")
                }
            }
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(Main::class.java)
    }
}

fun main(args: Array<String>) = Main().main(args)