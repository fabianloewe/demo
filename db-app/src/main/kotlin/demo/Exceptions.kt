package demo

class IllegalQueryLanguageException(language: String) : RuntimeException(
    "The query language $language is not supported"
)

class QueryExecutionException(exception: Throwable) : RuntimeException(
    "The query could not correctly be executed",
    exception
)