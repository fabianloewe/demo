package demo.utils

import com.google.protobuf.Any
import com.google.protobuf.ByteString
import demo.protocol.AnswerOuterClass
import demo.protocol.GraphDataOuterClass
import org.neo4j.graphdb.Entity
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship
import org.neo4j.graphdb.RelationshipType

class AnswerFactory(
    private val edgeLabel: String = HYPERGRAPH_EDGE_LABEL,
    private val edgeOutLabel: String = SPECIALIZED_HYPERGRAPH_EDGE_OUT_LABEL,
    private val edgeInLabel: String = SPECIALIZED_HYPERGRAPH_EDGE_IN_LABEL,
    private val metaLabel: String = SPECIALIZED_HYPERGRAPH_META_LABEL
) {
    private inner class Builder(
        private val allValues: ResultValues
    ) : AnswerBuilderHelper() {
        override val edgeOutLabel: String = this@AnswerFactory.edgeOutLabel
        override val edgeInLabel: String = this@AnswerFactory.edgeInLabel
        override val metaLabel: String = this@AnswerFactory.metaLabel

        /**
         * Extract all relationships from values.
         */
        private val allRelationships by lazy {
            allValues
                .filterIsInstance<Relationship>()
                .distinct()
        }

        /**
         * Extract nodes from values.
         */
        private val allNodes by lazy {
            val nodesInRelationships = allRelationships.flatMap { listOf(it.startNode, it.endNode) }
            val nodesInValues = allValues.filterIsInstance<Node>()
            (nodesInRelationships + nodesInValues).distinct()
        }

        /**
         * Creates a vertex.
         *
         * It doesn't have a valid id.
         * This prototype can be used to generate an id.
         */
        private fun createVertex(node: Node): GraphDataOuterClass.Vertex {
            // Extract label names
            val labels = node.labels.map { it.name() }
            // Convert properties to a Map<String, String>
            val props = node.publicProperties
            return GraphDataOuterClass.Vertex
                .newBuilder()
                .setId(ByteString.copyFromUtf8(node.id.toString()))
                .addAllLabels(labels)
                .putAllProperties(props)
                .build()
        }

        /**
         * Creates a hyperedge.
         *
         * It doesn't have a valid id.
         * This prototype can be used to generate an id.
         */
        private fun createHyperedge(node: Node): GraphDataOuterClass.Edge {
            // Extract label names
            val labels = node.labels.map { it.name() }
            // Convert properties to a Map<String, String>
            val props = node.publicProperties
            // Find start vertex by following an "EdgeOut" relationship
            return GraphDataOuterClass.Edge
                .newBuilder()
                .setId(ByteString.copyFromUtf8(node.id.toString()))
                .addAllLabels(labels)
                .putAllProperties(props)
                .setFromVertex(node.startVertex)
                .setToVertex(node.endVertex)
                .addAllMetaEdges(node.metaEdges)
                .build()
        }

        /**
         * Creates an edge.
         *
         * It doesn't have a valid id.
         * This prototype can be used to generate an id.
         */
        private fun createEdge(relationship: Relationship): GraphDataOuterClass.Edge {
            // Convert properties to a Map<String, String>
            val props = relationship.publicProperties
            return GraphDataOuterClass.Edge
                .newBuilder()
                .setId(ByteString.copyFromUtf8(relationship.id.toString()))
                .addLabels(relationship.type.name())
                .putAllProperties(props)
                .setFromVertex(ByteString.copyFromUtf8(relationship.startNode.id.toString()))
                .setToVertex(ByteString.copyFromUtf8(relationship.endNode.id.toString()))
                .build()
        }

        /**
         * Convert Neo4j [Node]s to [GraphDataOuterClass.Vertex].
         */
        val vertices: List<GraphDataOuterClass.Vertex> by lazy {
            // Ignore nodes with "Edge" label.
            allNodes
                .filter { !it.hasLabel { edgeLabel } }
                .map(::createVertex)
        }

        /**
         * Convert edges with meta-edges to [GraphDataOuterClass.Edge]
         */
        private val hyperedges by lazy {
            // Nodes with "Edge" label are meant to be interpreted as edges
            // because they can have meta-edges.
            allNodes
                .filter { it.hasLabel { edgeLabel } }
                .map(::createHyperedge)
        }

        /**
         * Convert Neo4j [Relationship]s to [GraphDataOuterClass.Edge].
         */
        private val commonEdges by lazy {
            allRelationships
                .filterNot { rel ->
                    rel.isType { edgeInLabel } || rel.isType { edgeOutLabel }
                }
                .map(::createEdge)
        }

        /**
         * Concatenate [hyperedges] with [commonEdges] to get all edges.
         */
        val edges: List<GraphDataOuterClass.Edge> by lazy {
            commonEdges + hyperedges
        }

        /**
         * Build a ready to send [AnswerOuterClass.Answer] with [GraphDataOuterClass.GraphData] message.
         */
        fun build(): AnswerOuterClass.Answer {
            val graphData = GraphDataOuterClass.GraphData
                .newBuilder()
                .addAllVertices(vertices)
                .addAllEdges(edges)
                .build()
            val data = Any.pack(graphData)
            return AnswerOuterClass.Answer
                .newBuilder()
                .setType("graph")
                .setData(data)
                .build()
        }
    }

    /**
     * Create Answer message from [resultValues].
     */
    fun create(resultValues: ResultValues): AnswerOuterClass.Answer {
        return Builder(resultValues).build()
    }
}