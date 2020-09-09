package demo.protocol

import io.libp2p.core.*
import io.libp2p.core.multistream.StrictProtocolBinding
import io.libp2p.protocol.ProtobufProtocolHandler
import java.util.concurrent.CompletableFuture

class QueryRespondProtocol(
    private val answerCallback: AnswerCallback
) : ProtobufProtocolHandler<AnswerController>(AnswerOuterClass.Answer.getDefaultInstance()) {
    /**
     * Defines a binding for libp2p to this QueryProtocol.
     *
     * This is used when the QueryProtocol, identified by [NAME], has been negotiated
     * with the connecting peer.
     */
    open inner class Binding : StrictProtocolBinding<AnswerController>(
        NAME,
        QueryRespondProtocol(answerCallback)
    )

    private fun onStart(stream: Stream): CompletableFuture<out AnswerController> {
        // Create a new AnswerHandler instance and register it as a handler for this stream
        val answerReadyFuture = CompletableFuture<Unit>()
        val answerHandler = AnswerHandler(answerReadyFuture, answerCallback)
        stream.pushHandler(answerHandler)

        // Signal readiness and return the future controller
        return answerReadyFuture.thenApply { answerHandler }
    }

    /**
     * Called if this is the initiator of the stream
     */
    override fun onStartInitiator(stream: Stream) = onStart(stream)

    /**
     * Called if the other peer has initiated the stream and
     * we are just responding.
     */
    override fun onStartResponder(stream: Stream) = onStart(stream)

    companion object {
        /**
         * Defines the query protocol version.
         */
        const val VERSION = "1.0.0"

        /**
         * Defines the query protocol multiselect identifier for protocol negotiation.
         */
        const val NAME = "/demo/query/respond/$VERSION"
    }
}
