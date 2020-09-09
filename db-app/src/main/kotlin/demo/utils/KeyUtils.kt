package demo.utils

import com.google.protobuf.ByteString
import io.libp2p.crypto.keys.RsaPublicKey
import java.security.KeyFactory
import java.security.PrivateKey
import java.security.PublicKey
import java.security.spec.PKCS8EncodedKeySpec
import java.security.spec.X509EncodedKeySpec
import java.util.*

/**
 * Common [KeyFactory] instance
 */
private val kf = KeyFactory.getInstance("RSA")

fun String.toPublicKey(): PublicKey {
    val keySpecX509 = X509EncodedKeySpec(Base64.getDecoder().decode(this))
    return kf.generatePublic(keySpecX509)
}

fun ByteString.toPublicKey(): PublicKey {
    val keySpecX509 = X509EncodedKeySpec(Base64.getDecoder().decode(toByteArray()))
    return kf.generatePublic(keySpecX509)
}

fun String.toPrivateKey(): PrivateKey {
    val keySpecPKCS8 = PKCS8EncodedKeySpec(Base64.getDecoder().decode(this))
    return kf.generatePrivate(keySpecPKCS8)
}

fun PublicKey.toRsaPublicKey() = RsaPublicKey(this)