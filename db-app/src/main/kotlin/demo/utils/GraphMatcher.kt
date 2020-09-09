package demo.utils

import demo.protocol.GraphDataOuterClass
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship

abstract class GraphMatcher {
    /**
     * All edges
     */
    protected abstract val edges: List<GraphDataOuterClass.Edge>

    /**
     * Finds a corresponding vertex to [node].
     */
    protected abstract fun findVertex(node: Node): GraphDataOuterClass.Vertex?

    /**
     * Checks if this [Node] is likely equal to the given [vertex].
     */
    open fun Node.isLikelyEqualTo(
        vertex: GraphDataOuterClass.Vertex,
        compareDepth: Int = 0,
        compareRelationships: Boolean = true,
    ): Boolean {
        val nodeLabels = labels.map { it.name() }
        // Check if all labels match
        val doLabelsMatch = vertex.labelsList.all { vertexLabel -> vertexLabel in nodeLabels }
        // Check if the properties of vertex have corresponding properties in the tested node
        val doPropsMatch by lazy {
            vertex.propertiesMap.all { it.value == getProperty(it.key, null) }
        }
        // Check if the node has corresponding relationships to the edges of vertex
        val hasSameRelations by lazy {
            // Stop comparing after node c:
            // (a {depth: 0})-[{depth: 1}]-(b {depth: 2})-[{depth: 3}]-(c {depth: 4})
            if (compareRelationships && compareDepth < 4) {
                hasCorrespondingRelationshipsTo(vertex, compareDepth + 1)
            } else {
                true
            }
        }
        return doLabelsMatch && doPropsMatch && hasSameRelations
    }

    /**
     * Checks if this [Relationship] is likely equal to the given [edge].
     *
     * This is the implementation method of [Relationship.isLikelyEqualTo].
     */
    protected fun compareRelationshipTo(
        relationship: Relationship,
        edge: GraphDataOuterClass.Edge,
        baseNode: Node,
        baseVertex: GraphDataOuterClass.Vertex,
        compareDepth: Int = 0,
        compareOtherNode: Boolean = true
    ): Boolean {
        // Find vertex for otherNode and compare otherNode with the vertex
        // Otherwise return false
        fun compareNode(otherNode: Node): Boolean {
            val otherVertex = findVertex(otherNode)
            return if (otherVertex != null) {
                otherNode.isLikelyEqualTo(otherVertex, compareDepth + 1)
            } else {
                false
            }
        }

        val errorMessage = "Relationship has no correspondence to node ${relationship.id} which is unexpected"

        // with the same direction
        val hasSameDirection = when {
            relationship.startNodeId == baseNode.id -> edge.fromVertex == baseVertex.id
            relationship.endNodeId == baseNode.id -> edge.toVertex == baseVertex.id
            else -> error(errorMessage)
        }
        // with the same label (just the first because Neo4j only allows one)
        val doesLabelMatch by lazy { relationship.isType { edge.labelsList.first() } }
        // with the same properties
        val doPropsMatch by lazy {
            edge.propertiesMap.all { it.value == relationship.getProperty(it.key, null) }
        }
        // with matching nodes
        val doesOtherNodeMatch by lazy {
            // Stop comparing after node c:
            // (a {depth: 0})-[{depth: 1}]-(b {depth: 2})-[{depth: 3}]-(c {depth: 4}) <=
            if (compareOtherNode && compareDepth < 4) when {
                relationship.startNodeId == baseNode.id -> compareNode(relationship.endNode)
                relationship.endNodeId == baseNode.id -> compareNode(relationship.startNode)
                else -> error(errorMessage)
            } else true
        }
        return hasSameDirection && doesLabelMatch && doPropsMatch && doesOtherNodeMatch
    }

    /**
     * Checks if this [Relationship] is likely equal to the given [edge].
     */
    open fun Relationship.isLikelyEqualTo(
        edge: GraphDataOuterClass.Edge,
        baseNode: Node,
        baseVertex: GraphDataOuterClass.Vertex,
        compareDepth: Int = 0,
        compareOtherNode: Boolean = true
    ) = compareRelationshipTo(this, edge, baseNode, baseVertex, compareDepth, compareOtherNode)

    /**
     * Checks if the [Node] has relationships corresponding to the edges of [vertex].
     *
     * This method doesn't check if the other relationship site matches.
     * This can lead to false positives in certain circumstances.
     */
    open fun Node.hasCorrespondingRelationshipsTo(
        vertex: GraphDataOuterClass.Vertex,
        compareDepth: Int = 0
    ): Boolean {
        // Get edges where vertex is either start or end vertex
        val edgesWithVertex = edges.filter {
            vertex.id == it.fromVertex || vertex.id == it.toVertex
        }
        // Check for all relationships
        return relationships.all { relationship ->
            // if there is a corresponding edge
            edgesWithVertex.any { edge ->
                relationship.isLikelyEqualTo(edge, this, vertex, compareDepth)
            }
        }
    }

    /**
     * Checks if [this] node has this relationship to [endNode].
     */
    open fun Node.hasRelationshipTo(
        endNode: Node,
        label: String,
        properties: Map<String, String>
    ) = relationships.any { relationship ->
        // Has same end node?
        val hasEndNode by lazy { relationship.endNode == endNode }
        // Has same label?
        val isType by lazy { relationship.isType { label } }
        // Has matching properties for the received ones?
        val hasProps by lazy {
            properties.all { prop -> relationship.allProperties[prop.key]?.toString() == prop.value }
        }

        hasEndNode && isType && hasProps
    }
}