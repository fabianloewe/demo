package demo.utils

import io.libp2p.core.PeerId
import io.libp2p.core.PeerInfo
import io.libp2p.core.multiformats.Multiaddr
import io.libp2p.crypto.keys.RsaPublicKey
import io.libp2p.etc.types.toProtobuf
import java.io.File as JavaFile
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import java.util.*

@Serializable
data class SimplePeerInfo(
    val peerId: String,
    val listenAddresses: List<String>,
    val publicKey: String
) {
    constructor(peerId: PeerId, listenAddresses: List<Multiaddr>, publicKey: RsaPublicKey) : this(
        peerId.toBase58(),
        listenAddresses.map { it.toString() },
        Base64.getEncoder().encodeToString(publicKey.bytes())
    )

    fun toJson() = Json.encodeToString(this)

    fun toPeerInfo() = PeerInfo(
        PeerId.fromBase58(peerId),
        listenAddresses.map { Multiaddr(it) }
    )

    fun toRsaPublicKey() = publicKey.toPublicKey().toRsaPublicKey()

    companion object {
        fun from(file: JavaFile): SimplePeerInfo {
            val json = file.readText()
            return Json.decodeFromString(json)
        }
    }
}