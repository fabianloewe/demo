package demo

import demo.config.DatabaseConfig
import demo.protocol.GraphDataOuterClass
import demo.protocol.QueryOuterClass
import demo.utils.File
import demo.utils.GraphDataConsumer
import demo.utils.ResultValues
import io.libp2p.core.PeerId
import org.neo4j.configuration.GraphDatabaseSettings.DEFAULT_DATABASE_NAME
import org.neo4j.configuration.connectors.BoltConnector
import org.neo4j.configuration.helpers.SocketAddress
import org.neo4j.dbms.api.DatabaseManagementServiceBuilder
import org.slf4j.LoggerFactory
import org.neo4j.graphdb.QueryExecutionException as Neo4jQueryExecutionException

class DatabaseService(
    private val config: DatabaseConfig
) {
    /**
     * Neo4j database management service.
     *
     * The Bolt connector is enabled for debugging purposes with another graph GUI like the IntelliJ plugin.
     */
    private val dbMgmtService = DatabaseManagementServiceBuilder(config.storeDir.toFile())
        .apply {
            if (config.boltPort != null) {
                setConfig(BoltConnector.enabled, true)
                setConfig(BoltConnector.listen_address, SocketAddress("localhost", config.boltPort))
            }
        }
        .build()
    private val db = dbMgmtService.database(DEFAULT_DATABASE_NAME)

    private val graphDataConsumer = GraphDataConsumer(db, config)

    init {
        registerShutdownHook()
    }

    /**
     * Registers an application shutdown hook which shuts down the database.
     */
    private fun registerShutdownHook() {
        logger.debug("Registering shutdown hook for database")
        Runtime.getRuntime().addShutdownHook(object : Thread() {
            override fun run() {
                dbMgmtService.shutdown()
            }
        })
    }

    /**
     * Executes all statements from the given init script.
     */
    private fun executeInitScript(initScript: File) {
        //logger.debug("Loading script: ${initScript.content}")
        val statements = initScript
            .content
            .split("\n", "\n\r")
            .filter {
                // Ignore comments
                !it.startsWith("//")
            }
            .joinToString("")
            .split(';')
            .filter { it.isNotBlank() }
            .map {
                // Remove leading and trailing whitespaces and blanks
                it.trim()
            }

        for (stmt in statements) {
            db.executeTransactionally(stmt)
        }
    }

    /**
     * Clears the database.
     */
    private fun clear() {
        db.executeTransactionally("MATCH (n) DETACH DELETE n")
    }

    /**
     * Initializes the database.
     */
    fun start() {
        if (config.clearDb) clear()
        if (config.initScript != null) executeInitScript(config.initScript)
        logger.info("Started database service.")
    }

    /**
     * Processes the given query.
     *
     * The result values must be processed in the [resultHandler]
     * because the values depend on the [org.neo4j.graphdb.Transaction]
     * and [org.neo4j.graphdb.Result] to be open.
     * After the handler has been executed, both resources will be closed automatically.
     *
     * @param query The query to be processed
     * @param resultHandler The handler working with the query's result values.
     * @throws IllegalQueryLanguageException If a unsupported query language has been used
     * @throws QueryExecutionException If the query execution fails for some reason
     */
    fun process(
        query: QueryOuterClass.Query,
        resultHandler: (ResultValues) -> Unit
    ) {
        logger.debug("Trying to process incoming query: $query")

        if (query.language.toLowerCase() != "cypher")
            throw IllegalQueryLanguageException(query.language)

        try {
            // Execute a transaction.
            // Java equivalent for use(): try (Transaction tx = db.beginTx()) { ... }
            db.beginTx().use { tx ->
                run {
                    if (query.argsMap != null)
                        tx.execute(query.query, query.argsMap as Map<String, Any>)
                    else
                        tx.execute(query.query)
                }.use { result ->
                    val resultValues = result
                        .asSequence()
                        .toList()
                        .flatMap { it.values }
                    logger.debug("Got result values: $resultValues")
                    resultHandler(resultValues)
                }
            }
        } catch (e: Neo4jQueryExecutionException) {
            throw QueryExecutionException(e)
        }
    }

    /**
     * Writes the graph data to the database.
     */
    fun writeGraphData(peerId: PeerId, graphData: GraphDataOuterClass.GraphData) {
        graphDataConsumer.consume(peerId, graphData)
    }

    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }
}