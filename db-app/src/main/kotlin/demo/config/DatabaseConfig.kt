package demo.config

import demo.utils.File
import java.nio.file.Path

data class DatabaseConfig(
    val storeDir: Path,
    val hypergraphVertexLabel: String,
    val hypergraphEdgeLabel: String,
    val specializedHypergraphMetaLabel: String,
    val specializedHypergraphInLabel: String,
    val specializedHypergraphOutLabel: String,
    val initScript: File? = null,
    val boltPort: Int? = 7687,
    val clearDb: Boolean = false,
)