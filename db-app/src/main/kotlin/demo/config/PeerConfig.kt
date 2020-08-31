package demo.config

import demo.utils.File
import io.libp2p.core.multiformats.Multiaddr

data class PeerConfig(
  val listenAddresses: List<String>,
  val privateKey: File? = null,
  val publicKey: File? = null,
  val publishAddress: String? = null,
  val bootstrapPeers: List<Multiaddr> = listOf()
)