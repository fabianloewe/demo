package demo.protocol

import io.libp2p.core.Stream
import java.util.concurrent.CompletableFuture

interface AnswerController {
    fun sendAnswer(answer: AnswerOuterClass.Answer)
}

interface QueryController {
    fun query(query: String, language: String, filters: List<String>) {
        val builder = QueryOuterClass.Query
            .newBuilder()
            .setQuery(query)
            .setLanguage(language)
        for ((index, filter) in filters.withIndex()) builder.setFilter(index, filter)
        val message = builder.build()
        query(message)
    }

    fun query(message: QueryOuterClass.Query)
}

interface QueryProtocolController : AnswerController, QueryController {
    companion object {
        /**
         * Create a [QueryProtocolController] based on an existing [AnswerController] and [QueryController].
         */
        fun create(
            answerController: AnswerController,
            queryController: QueryController
        ): QueryProtocolController = object : QueryProtocolController,
            AnswerController by answerController,
            QueryController by queryController { }

        /**
         * Create a [QueryProtocolController] for an existing [Stream].
         */
        fun create(
            stream: Stream,
            queryCallback: QueryCallback,
            answerCallback: AnswerCallback
        ) : CompletableFuture<QueryProtocolController> {
            val answerFuture = CompletableFuture<Unit>()
            val queryFuture = CompletableFuture<Unit>()
            val controller = object : QueryProtocolController,
                AnswerController by AnswerHandler(answerFuture, answerCallback, stream),
                QueryController by QueryHandler(queryFuture, queryCallback, stream) { }
            return CompletableFuture
                .allOf(answerFuture, queryFuture)
                .thenApply { controller }
        }
    }
}
