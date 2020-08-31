package demo

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.groups.OptionGroup
import com.github.ajalt.clikt.parameters.groups.cooccurring
import com.github.ajalt.clikt.parameters.options.*
import com.github.ajalt.clikt.parameters.types.path
import demo.config.DatabaseConfig
import demo.config.PeerConfig
import demo.protocol.*
import demo.utils.AnswerBuilder.Companion.toAnswer
import demo.utils.File
import demo.utils.ResultValues
import io.libp2p.core.Stream
import io.libp2p.core.multiformats.Multiaddr
import org.neo4j.graphdb.Result
import org.slf4j.LoggerFactory
import java.nio.file.Path
import java.nio.file.Paths
import java.util.concurrent.CompletableFuture

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
    ).multiple(listOf("/ip4/127.0.0.1/tcp/7710"))

    private val publishAddress: String? by option(
        "-p", "--publish-address",
        help = "Public multiaddress of this host to show to other peers"
    )

    private val keys by KeysOptions().cooccurring()

    private val storeDir: Path by option(
        "-d", "--db-dir",
        help = "Path to a directory where the database can be stored"
    ).path().default(Paths.get(System.getProperty("user.dir")))

    private val dbInitScript: File? by option(
        "-i", "--init-db",
        help = "Path to an initialization Cypher script"
    ).path().convert { File.Path(it) }

    /**
     * Lazily creates the [DatabaseConfig] on request.
     */
    private val dbConfig by lazy {
        DatabaseConfig(
            storeDir,
            dbInitScript
        )
    }

    /**
     * Lazily create the [DatabaseService] on request.
     */
    private val dbService by lazy {
        DatabaseService(dbConfig)
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
                // Let DatabaseService process the query
                dbService.process(query) { result ->
                    sendResult(stream, result)
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
        val answer = result.toAnswer()
        // Reuse stream to send message
        val future = CompletableFuture<Unit>()
        val controller = AnswerHandler(future, answerHandler, stream)
        logger.debug("Sending answer: $answer")
        controller.sendAnswer(answer)
        return future
    }

    /**
     * The query handler.
     *
     * It does nothing in this demo as we don't receive Answer messages.
     */
    private val answerHandler: AnswerCallback get() = { _, _ -> Unit }

    /**
     * Lazily creates the [PeerConfig] on request.
     */
    private val peerConfig by lazy {
        PeerConfig(
            listenAddresses,
            keys?.privateKey,
            keys?.publicKey,
            publishAddress
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
            // Store the peer address in a file for the web app to read
            val storeFile = Paths.get("..", "db-app-info.json").toFile()
            peerService.storeAddress(storeFile)
        }

        // The app is initialized, so leave this thread but keep running
        Thread.currentThread().join()
    }

    companion object {
        private val logger = LoggerFactory.getLogger(Main::class.java)
    }
}

fun main(args: Array<String>) = Main().main(args)