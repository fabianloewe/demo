package demo.utils

import java.nio.charset.Charset
import java.nio.file.Files

sealed class File {
    abstract val content: String

    data class Content(override val content: String) : File()
    data class Path(val path: java.nio.file.Path) : File() {
        override val content: String by lazy {
            Files
                .readAllBytes(path)
                .toString(Charset.defaultCharset())
        }
    }
}