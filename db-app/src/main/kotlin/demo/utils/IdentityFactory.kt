package demo.utils

import com.google.protobuf.ByteString
import demo.protocol.GraphDataOuterClass
import io.libp2p.core.multiformats.Multihash
import io.netty.buffer.ByteBuf
import io.netty.buffer.Unpooled
import org.neo4j.graphdb.Entity
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship
import java.nio.ByteBuffer
import java.util.concurrent.ConcurrentHashMap

object IdentityFactory {
    private class Builder(private val buffer: ByteBuf = Unpooled.buffer()) {
        fun addLabel(label: String) {
            buffer.writeBytes(label.toByteArray())
        }

        fun addLabels(labels: List<String>) {
            for (label in labels) buffer.writeBytes(label.toByteArray())
        }

        fun addProperties(properties: Map<String, String>) {
            for (prop in properties) {
                buffer.writeBytes(prop.key.toByteArray())
                buffer.writeBytes(prop.value.toByteArray())
            }
        }

        fun addFromVertex(id: ByteString) {
            buffer.writeBytes(id.toByteArray())
        }

        fun addToVertex(id: ByteString) {
            buffer.writeBytes(id.toByteArray())
        }

        fun addMetaEdges(ids: List<ByteString>) {
            for (id in ids) buffer.writeBytes(id.toByteArray())
        }

        /**
         * Build the network-wide id.
         */
        fun build(): ByteString {
            val descriptor = Multihash.Descriptor(Multihash.Digest.SHA2, 256)
            val multihash = Multihash.digest(descriptor, buffer)
            val multihashBytes = multihash.bytes.array()
            return ByteString.copyFrom(multihashBytes)
        }
    }

    /**
     * Cache for ids to prevent duplicated id generation.
     */
    private val neo4jIdCache = ConcurrentHashMap<Entity, ByteString>()

    /**
     * Builds the id of graph elements.
     *
     * Always start with labels, followed by properties, fromVertex, toVertex and metaEdges
     * if applicable.
     */
    private fun buildId(handler: Builder.() -> Unit): ByteString {
        val builder = Builder()
        builder.handler()
        return builder.build()
    }

    /**
     * Build the network-wide id for this Neo4j node
     */
    fun getVertexId(node: Node): ByteString = neo4jIdCache[node] ?: run {
        // Check if node is a hyperedge
        if (node.hasLabel { "Edge" }) {
            getHyperedgeId(node)
        } else {
            val id = buildId {
                addLabels(node.labels.map { it.name() })
                addProperties(node.publicProperties)
            }
            neo4jIdCache[node] = id
            id
        }
    }

    /**
     * Build the network-wide edge id
     */
    fun getEdgeId(relationship: Relationship): ByteString = neo4jIdCache[relationship] ?: run {
        val id = buildId {
            addLabel(relationship.type.name())
            addProperties(relationship.publicProperties)
            addFromVertex(getVertexId(relationship.startNode))
            addToVertex(getVertexId(relationship.endNode))
        }
        neo4jIdCache[relationship] = id
        id
    }

    /**
     * Build the network-wide id for this Neo4j node
     */
    fun getHyperedgeId(node: Node): ByteString = neo4jIdCache[node] ?: run {
        val id = buildId {
            addLabels(node.labels.map { it.name() })
            addProperties(node.publicProperties)
            addFromVertex(node.startVertex)
            addToVertex(node.endVertex)
            addMetaEdges(node.metaEdges)
        }
        neo4jIdCache[node] = id
        id
    }

    /**
     * Build the network-wide id for this Neo4j node
     */
    fun getMetaEdgeId(relationship: Relationship): ByteString = neo4jIdCache[relationship] ?: run {
        val id = buildId {
            addLabel(relationship.type.name())
            addProperties(relationship.publicProperties)
            // We don't add the start vertex because it's the hyperedge which can lead to cycles.
            // Furthermore it is not needed as the hyperedge includes this id.
            //addFromVertex(getVertexId(relationship.startNode))
            addToVertex(getVertexId(relationship.endNode))
        }
        neo4jIdCache[relationship] = id
        id
    }

}