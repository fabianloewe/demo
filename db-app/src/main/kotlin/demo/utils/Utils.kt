package demo.utils

import com.google.protobuf.ByteString
import demo.protocol.GraphDataOuterClass
import io.libp2p.core.multiformats.Multihash
import io.netty.buffer.Unpooled
import org.neo4j.graphdb.Entity
import org.neo4j.graphdb.Node
import org.neo4j.graphdb.Relationship
import org.neo4j.graphdb.RelationshipType
import java.nio.ByteBuffer
import java.util.*
import java.util.concurrent.ConcurrentHashMap

/**
 * Convert UUID to ByteString
 */
fun UUID.toByteString(): ByteString {
    val buffer = ByteBuffer.wrap(ByteArray(16))
    buffer.putLong(mostSignificantBits)
    buffer.putLong(leastSignificantBits)
    return ByteString.copyFrom(buffer.array())
}