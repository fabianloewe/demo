import com.google.protobuf.gradle.*

plugins {
    kotlin("jvm")
    java
    id("com.google.protobuf") version "0.8.13"
}

repositories {
    mavenCentral()
    jcenter()
    maven("https://plugins.gradle.org/m2/")
}

val protobufVersion = "3.13.0"

dependencies {
    implementation(kotlin("stdlib-jdk8"))

    implementation("com.google.protobuf:protobuf-java:$protobufVersion")

    // Required for protobuf
    if (JavaVersion.current().isJava9Compatible) {
        // Workaround for @javax.annotation.Generated
        // see: https://github.com/grpc/grpc-java/issues/3633
        implementation("javax.annotation:javax.annotation-api:1.3.2")
    }
}

protobuf {
    protoc {
        // The artifact spec for the Protobuf Compiler
        artifact = "com.google.protobuf:protoc:$protobufVersion"
    }

    /*
    generateProtoTasks {
        ofSourceSet("main").forEach { task ->
            task.builtins {
                id("js") {
                    option("import_style=commonjs")
                    option("binary")
                }
            }
        }
    }
    */
}

sourceSets {
    main {
        java {
            srcDirs("build/generated/source/proto/main/java")
        }
    }
}
