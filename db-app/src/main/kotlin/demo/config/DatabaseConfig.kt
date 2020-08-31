package demo.config

import demo.utils.File
import java.nio.file.Path

data class DatabaseConfig(
    val storeDir: Path,
    val initScript: File? = null
    //val databaseName: String = "demo"
)