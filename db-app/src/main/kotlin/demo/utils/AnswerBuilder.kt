package demo.utils

import com.google.protobuf.Any
import com.google.protobuf.AnyProto
import demo.protocol.AnswerOuterClass
import demo.protocol.GraphDataOuterClass
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship
import org.neo4j.graphdb.RelationshipType

typealias ResultValues = List<kotlin.Any>

class AnswerBuilder(private val allValues: ResultValues) {
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
     * Convert Neo4j [Node]s to [GraphDataOuterClass.Vertex].
     */
    val vertices: List<GraphDataOuterClass.Vertex> by lazy {
        // Ignore nodes with "Edge" label.
        allNodes
            .filter { !it.hasLabel { "Edge" } }
            .map { node ->
                // Extract label names
                val labels = node.labels.map { it.name() }
                // Convert properties to a Map<String, String>
                val props = node.allProperties.mapValues { it.toString() }
                GraphDataOuterClass.Vertex
                    .newBuilder()
                    .setId(node.id)
                    .addAllLabels(labels)
                    .putAllProperties(props)
                    .build()
            }
    }

    /**
     * Convert edges with meta-edges to [GraphDataOuterClass.Edge]
     */
    private val metaSupportingEdges by lazy {
        // Nodes with "Edge" label are meant to be interpreted as edges
        // because they can have meta-edges.
        allNodes
            .filter { it.hasLabel { "Edge" } }
            .map { node ->
                // Extract label names
                val labels = node.labels.map { it.name() }
                // Convert properties to a Map<String, String>
                val props = node.allProperties.mapValues { it.toString() }
                // Find start vertex by following an "EdgeOut" relationship
                val startVertex = node
                    .getRelationships(EDGE_OUT)
                    .map { it.startNodeId }
                    .first()
                // Find end vertex by following an "EdgeIn" relationship
                val endVertex = node
                    .getRelationships(EDGE_IN)
                    .map { it.endNodeId }
                    .first()
                // Collect meta-edges by searching for "MetaEdge" relationship
                val metaEdges = node
                    .getRelationships(META_EDGE)
                    .map { it.id }
                GraphDataOuterClass.Edge
                    .newBuilder()
                    .setId(node.id)
                    .addAllLabels(labels)
                    .putAllProperties(props)
                    .setFromVertex(startVertex)
                    .setToVertex(endVertex)
                    .addAllMetaEdges(metaEdges)
                    .build()
            }
    }

    /**
     * Convert Neo4j [Relationship]s to [GraphDataOuterClass.Edge].
     */
    private val commonEdges by lazy {
        allRelationships.map { rel ->
            // Convert properties to a Map<String, String>
            val props = rel.allProperties.mapValues { it.toString() }
            GraphDataOuterClass.Edge
                .newBuilder()
                .setId(rel.id)
                .addLabels(rel.type.name())
                .putAllProperties(props)
                .setFromVertex(rel.startNodeId)
                .setToVertex(rel.endNodeId)
                .build()
        }
    }

    /**
     * Concatenate [metaSupportingEdges] with [commonEdges] to get all edges.
     */
    val edges: List<GraphDataOuterClass.Edge> by lazy {
        metaSupportingEdges + commonEdges
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

    companion object {
        private val EDGE_OUT = RelationshipType { "EdgeOut" }
        private val EDGE_IN = RelationshipType { "EdgeIn" }
        private val META_EDGE = RelationshipType { "MetaEdge" }

        /**
         * Helper method for converting a Neo4j [Result] to a [AnswerOuterClass.Answer].
         */
        fun ResultValues.toAnswer() = AnswerBuilder(this).build()
    }
}