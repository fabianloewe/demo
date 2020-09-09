package demo.utils

import com.google.protobuf.ByteString
import demo.config.DatabaseConfig
import demo.protocol.GraphDataOuterClass
import io.libp2p.core.PeerId
import org.neo4j.graphdb.GraphDatabaseService
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship
import org.neo4j.graphdb.Transaction
import java.util.concurrent.ConcurrentHashMap

/**
 * Consumes a given [GraphDataOuterClass.GraphData] and integrates the data into the database of [db].
 *
 * To better match nodes with vertices it follows the stored nodes and their relationships
 * to a length of 3:
 * `(a {depth: 0})-[{depth: 1}]-(b {depth: 2})-[{depth: 3}]-(c {depth: 4})` <= stops here
 */
class GraphDataConsumer(
    private val db: GraphDatabaseService,
    private val dbConfig: DatabaseConfig
) {
    private val peerEntityMap = ConcurrentHashMap<PeerId, MutableMap<ByteString, Long>>()

    private inner class Builder(
        graphData: GraphDataOuterClass.GraphData,
        private val entityMap: MutableMap<ByteString, Long>
    ) : SpecializedHypergraphMatcher(
        dbConfig.hypergraphEdgeLabel,
        dbConfig.specializedHypergraphOutLabel,
        dbConfig.specializedHypergraphInLabel,
        dbConfig.specializedHypergraphMetaLabel
    ) {
        override val vertices = graphData.verticesList!!
        override val edges = graphData.edgesList!!

        /**
         * Create all nodes.
         */
        fun createNodes() {
            db.beginTx().use { tx ->
                for (vertex in vertices) {
                    val node = findNode(vertex, tx)
                    if (node == null) {
                        val newNode = tx.createNode()
                        for (label in vertex.labelsList) newNode.addLabel { label }
                        for (prop in vertex.propertiesMap) newNode.setProperty(prop.key, prop.value)
                        entityMap[vertex.id] = newNode.id
                    } else {
                        if (vertex.id !in entityMap) {
                            entityMap[vertex.id] = node.id
                        }
                    }
                }
                tx.commit()
            }
        }

        /**
         * Searches for a corresponding vertex to [node] in [vertices].
         */
        override fun findVertex(node: Node): GraphDataOuterClass.Vertex? {
            return entityMap
                .entries
                .find { (_, nodeId) -> nodeId == node.id }
                ?.let { (vertexId, _) ->
                    vertices.find { it.id == vertexId }
                }
        }

        /**
         * Searches for a node with the same [id].
         *
         * It doesn't check the database for existing nodes.
         */
        private fun findNode(id: ByteString, tx: Transaction): Node? = entityMap[id]?.let(tx::getNodeById)

        /**
         * Searches for a node equivalent to [vertex].
         *
         * It also considers already present nodes in the database.
         */
        private fun findNode(
            vertex: GraphDataOuterClass.Vertex,
            tx: Transaction,
            compareDepth: Int = 0
        ): Node? = findNode(vertex.id, tx) ?: with(tx) {
            allNodes.find { it.isLikelyEqualTo(vertex, compareDepth) }?.let { node ->
                // Ensure that node is not known with a different id
                if (entityMap.values.none { knownNodeId -> knownNodeId == node.id }) node
                else null
            }
        }

        /**
         * Creates all relationships.
         */
        fun createRelationships() {
            val hyperedges = edges.filter { edge -> "Edge" in edge.labelsList }
            // Create the hyperedges
            for (edge in hyperedges) createHyperedge(edge)

            val commonEdges = edges - hyperedges
            // Create the common edges
            for (edge in commonEdges) db.beginTx().use { tx ->
                tx.createRelationship(edge)
                tx.commit()
            }
        }

        /**
         * Creates hyperedge by creating it as node and connecting meta-edges to it.
         *
         * Uses its own transactions.
         */
        private fun createHyperedge(edge: GraphDataOuterClass.Edge) {
            db.beginTx().use { tx ->
                val edgeId = edge.id
                if (findNode(edgeId, tx) == null) {
                    val hyperedgeNode = tx.createNode()
                    for (label in edge.labelsList) hyperedgeNode.addLabel { label }
                    for (prop in edge.propertiesMap) hyperedgeNode.setProperty(prop.key, prop.value)
                    val startNode = findNode(edge.fromVertex, tx)
                        ?: error("Couldn't find start vertex: ${edge.fromVertex}")
                    val endNode = findNode(edge.toVertex, tx)
                        ?: error("Couldn't find end vertex: ${edge.toVertex}")
                    tx.createRelationship(startNode, hyperedgeNode, "EdgeIn")
                    tx.createRelationship(hyperedgeNode, endNode, "EdgeOut")
                    entityMap[edgeId] = hyperedgeNode.id
                }
                tx.commit()
            }

            for (metaEdgeId in edge.metaEdgesList) {
                val metaEdge = edges
                    .find { it.id == metaEdgeId }
                    ?: error("Couldn't find meta edge: $metaEdgeId")
                db.beginTx().use { tx ->
                    tx.createRelationship(metaEdge)
                    tx.commit()
                }
            }
        }

        /**
         * Creates new relationship based on edge.
         *
         * Doesn't commit the transaction.
         */
        private fun Transaction.createRelationship(edge: GraphDataOuterClass.Edge) {
            val startNode = findNode(edge.fromVertex, this)
                ?: error("Couldn't find start vertex: ${edge.fromVertex}")
            val endNode = findNode(edge.toVertex, this)
                ?: error("Couldn't find end vertex: ${edge.toVertex}")
            createRelationship(startNode, endNode, edge.labelsList.first(), edge.propertiesMap)
        }

        /**
         * Creates new relationship by searching for start and end node in created nodes.
         *
         * Doesn't commit the transaction.
         */
        private fun Transaction.createRelationship(
            startNode: Node,
            endNode: Node,
            label: String,
            properties: Map<String, String> = mapOf()
        ) {
            if (!startNode.hasRelationshipTo(endNode, label, properties)) {
                val relationship = startNode.createRelationshipTo(endNode) { label }
                for (prop in properties) relationship.setProperty(prop.key, prop.value)
            }
        }
    }

    /**
     * Processes the graph data.
     *
     * Only one graphData message will be processed at the time.
     */
    @Synchronized
    fun consume(peerId: PeerId, graphData: GraphDataOuterClass.GraphData) {
        val entityMap = peerEntityMap.getOrPut(peerId) { mutableMapOf() }
        Builder(graphData, entityMap).run {
            createNodes()
            createRelationships()
        }
    }
}