package demo.utils

import com.google.protobuf.ByteString
import org.neo4j.graphdb.Entity
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.RelationshipType

abstract class AnswerBuilderHelper {
    protected abstract val edgeOutLabel: String
    protected abstract val edgeInLabel: String
    protected abstract val metaLabel: String

    private val edgeOutType = RelationshipType { edgeOutLabel }
    private val edgeInType = RelationshipType { edgeInLabel }
    private val metaEdgeType = RelationshipType { metaLabel }

    /**
     * Get all properties that not start with '_' as a Map<String, String>
     */
    val Entity.publicProperties
        get() = this
            .allProperties
            // Filter out internal properties like _ID
            .filterNot { (key, _) -> key.startsWith('_') }
            .mapValues { (_, value) -> value.toString() }

    /**
     * Finds the start vertex of an hyperedge by following an "EdgeOut" relationship
     */
    val Node.startVertex
        get() = this
            .getRelationships(edgeOutType)
            .map { ByteString.copyFromUtf8(it.startNode.id.toString()) }
            .first()

    /**
     * Finds the end vertex of an hyperedge by following an "EdgeIn" relationship
     */
    val Node.endVertex
        get() = this
            .getRelationships(edgeInType)
            .map { ByteString.copyFromUtf8(it.endNode.id.toString()) }
            .first()

    /**
     * Collect the meta-edges of an hyperedge by searching for "MetaEdge" relationship
     */
    val Node.metaEdges
        get() = this
            .getRelationships(metaEdgeType)
            .map { ByteString.copyFromUtf8(it.id.toString()) }
}