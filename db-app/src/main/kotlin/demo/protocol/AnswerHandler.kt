package demo.protocol

import io.libp2p.core.ConnectionClosedException
import io.libp2p.core.PeerId
import io.libp2p.core.Stream
import io.libp2p.protocol.ProtocolMessageHandler
import java.util.concurrent.CompletableFuture

typealias AnswerCallback = (Stream, AnswerOuterClass.Answer) -> Unit

/**
 * Handles Answer messages.
 *
 * The incoming messages are simple byte buffers
 * which are decoded by the generated [AnswerOuterClass.Answer] class.
 * This handler is also the default [AnswerController] implementation.
 */
class AnswerHandler(
    /**
     * Signals its caller in the future if the stream is activated and ready.
     */
    private val readyFuture: CompletableFuture<Unit>,
    /**
     * Called when a Query message has arrived
     */
    private val answerCallback: AnswerCallback,
    /**
     * Holds the stream after activation
     */
    private var stream: Stream? = null
) : ProtocolMessageHandler<AnswerOuterClass.Answer>, AnswerController {
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
     * Converts the incoming buffer to a [AnswerOuterClass.Answer] and
     * passes the query to the user provided query callback which
     * is responsible for handling the message.
     */
    override fun onMessage(stream: Stream, msg: AnswerOuterClass.Answer) {
        answerCallback(stream, msg)
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

    override fun sendAnswer(answer: AnswerOuterClass.Answer): CompletableFuture<Unit> {
        return readyFuture.thenApply {
            stream?.writeAndFlush(answer)
        }
    }
}