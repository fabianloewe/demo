package demo.utils

import demo.protocol.GraphDataOuterClass
import org.neo4j.graphdb.Direction
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship

abstract class SpecializedHypergraphMatcher(
    private val edgeLabel: String = HYPERGRAPH_EDGE_LABEL,
    private val edgeOutLabel: String = SPECIALIZED_HYPERGRAPH_EDGE_OUT_LABEL,
    private val edgeInLabel: String = SPECIALIZED_HYPERGRAPH_EDGE_IN_LABEL,
    private val metaLabel: String = SPECIALIZED_HYPERGRAPH_META_LABEL
) : GraphMatcher() {
    /**
     * All vertices.
     */
    protected abstract val vertices: List<GraphDataOuterClass.Vertex>

    /**
     * Checks if [relationship] corresponds to a hyperedge [edge] by traversing it.
     */
    private fun compareWithHyperedge(
        relationship: Relationship,
        edge: GraphDataOuterClass.Edge
    ): Boolean {
        val isOutEdge = relationship.isType { edgeOutLabel }
        val isInEdge = relationship.isType { edgeInLabel }
        if (!isOutEdge && !isInEdge) return false

        val (hyperedgeNode, isHyperedgeStartNode) = when {
            relationship.startNode.hasLabel { edgeLabel } -> Pair(relationship.startNode, true)
            relationship.endNode.hasLabel { edgeLabel } -> Pair(relationship.endNode, false)
            else -> error("No corresponding hyperedge node found")
        }
        // Check for only edgeOutLabel, edgeInLabel and metaLabel in relationships
        // TODO: Could be more exact
        val hasCorrectlabels = hyperedgeNode.relationships.all {
            it.isType { edgeOutLabel } || it.isType { edgeInLabel } || it.isType { metaLabel }
        }
        if (!hasCorrectlabels) return false
        val hasCorrectProps = edge.propertiesMap.all {
            it.value == hyperedgeNode.getProperty(it.key, null)
        }
        if (!hasCorrectProps) return false

        // Get other node for comparison
        val otherNode = if (isOutEdge) {
            // Situation: (otherNode)-[nextRel:EdgeIn]->(hyperedgeNode)-[this:EdgeOut]->()
            val nextRel = hyperedgeNode.getSingleRelationship({ edgeInLabel }, Direction.BOTH)
                ?: error("No outgoing $edgeInLabel relationship found for hyperedge: $hyperedgeNode")
            nextRel.startNode
        } else {
            // Situation: ()-[this:EdgeIn]->(hyperedgeNode)-[nextRel:EdgeOut]->(otherNode)
            val nextRel = hyperedgeNode.getSingleRelationship({ edgeOutLabel }, Direction.BOTH)
                ?: error("No incoming $edgeOutLabel relationship found for hyperedge: $hyperedgeNode")
            nextRel.endNode
        }
        // Find the corresponding vertex to otherNode
        val otherVertex = if (isOutEdge) {
            vertices.find { it.id == edge.fromVertex }
        } else {
            vertices.find { it.id == edge.toVertex }
        }
        if (otherVertex != null) return otherNode.isLikelyEqualTo(otherVertex, compareRelationships = false)
        else error("Couldn't find end vertex: ${edge.toVertex}")
    }

    /**
     * Checks if this [Relationship] is likely equal to the given [edge].
     */
    override fun Relationship.isLikelyEqualTo(
        edge: GraphDataOuterClass.Edge,
        baseNode: Node,
        baseVertex: GraphDataOuterClass.Vertex,
        compareDepth: Int,
        compareOtherNode: Boolean
    ): Boolean = if (edgeLabel in edge.labelsList) {
        compareWithHyperedge(this, edge)
    } else {
        compareRelationshipTo(this, edge, baseNode, baseVertex, compareDepth, compareOtherNode)
    }
}