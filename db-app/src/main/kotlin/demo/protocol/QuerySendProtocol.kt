package demo.protocol

import io.libp2p.core.*
import io.libp2p.core.multistream.StrictProtocolBinding
import io.libp2p.protocol.ProtobufProtocolHandler
import io.libp2p.protocol.ProtocolHandler
import io.libp2p.protocol.ProtocolMessageHandler
import io.netty.buffer.ByteBuf
import java.util.concurrent.CompletableFuture

class QuerySendProtocol(
    private val queryCallback: QueryCallback
) : ProtobufProtocolHandler<QueryController>(QueryOuterClass.Query.getDefaultInstance()) {
    /**
     * Defines a binding for libp2p to this QueryProtocol.
     *
     * This is used when the QueryProtocol, identified by [NAME], has been negotiated
     * with the connecting peer.
     */
    open inner class Binding : StrictProtocolBinding<QueryController>(
        NAME,
        QuerySendProtocol(queryCallback)
    )

    private fun onStart(stream: Stream): CompletableFuture<out QueryController> {
        // Create a new QueryHandler instance and register it as a handler for this stream
        val queryReadyFuture = CompletableFuture<Unit>()
        val queryHandler = QueryHandler(queryReadyFuture, queryCallback)
        stream.pushHandler(queryHandler)

        // Signal readiness and return the future controller
        return queryReadyFuture.thenApply { queryHandler }
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
        const val NAME = "/demo/query/send/$VERSION"
    }
}
