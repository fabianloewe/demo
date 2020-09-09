package demo.protocol

import io.libp2p.core.ConnectionClosedException
import io.libp2p.core.Stream
import io.libp2p.protocol.ProtocolMessageHandler
import java.util.concurrent.CompletableFuture

typealias QueryCallback = (Stream, QueryOuterClass.Query) -> Unit

/**
 * Handles incoming messages.
 *
 * The incoming messages are simple byte buffers
 * which are decoded by the generated [QueryOuterClass.Query] class.
 * This handler is also the default [QueryController] implementation.
 */
class QueryHandler(
    /**
     * Signals its caller in the future if the stream is activated and ready.
     */
    private val readyFuture: CompletableFuture<Unit>,
    /**
     * Called when a Query message has arrived
     */
    private val queryCallback: QueryCallback,
    /**
     * Holds the stream after activation
     */
    private var stream: Stream? = null
) : ProtocolMessageHandler<QueryOuterClass.Query>, QueryController {
    init {
        if (stream != null) readyFuture.complete(Unit)
    }
    /**
     * Called after the stream is activated.
     *
     * Saves the stream internally for later usage and
     * signals readiness by completing [readyFuture].
     */
    override fun onActivated(stream: Stream) {
        this.stream = stream
        readyFuture.complete(Unit)
    }

    /**
     * Called for each incoming message.
     *
     * Converts the incoming buffer to a [QueryOuterClass.Query] and
     * passes the query to the user provided query callback which
     * is responsible for handling the message.
     */
    override fun onMessage(stream: Stream, msg: QueryOuterClass.Query) {
        queryCallback(stream, msg)
    }

    /**
     * Called if the stream is closed.
     */
    override fun onClosed(stream: Stream) {
        readyFuture.completeExceptionally(ConnectionClosedException())
    }

    /**
     * Called if the stream is closed exceptionally.
     */
    override fun onException(cause: Throwable?) {
        readyFuture.completeExceptionally(cause)
    }

    /**
     * Sends a [QueryOuterClass.Query] message to the connected peer.
     */
    override fun query(message: QueryOuterClass.Query): CompletableFuture<Unit> {
        return readyFuture.thenApply {
            stream?.writeAndFlush(message)
            stream?.close()
        }
    }
}