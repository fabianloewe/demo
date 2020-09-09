package demo.protocol

import io.libp2p.core.multistream.ProtocolBinding

fun QueryProtocol(
    queryCallback: QueryCallback,
    answerCallback: AnswerCallback
): Pair<ProtocolBinding<QueryController>, ProtocolBinding<AnswerController>> {
    return QuerySendProtocol(queryCallback).Binding() to
            QueryRespondProtocol(answerCallback).Binding()
}