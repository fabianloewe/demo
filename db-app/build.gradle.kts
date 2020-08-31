//import com.google.protobuf.gradle.*

plugins {
    kotlin("jvm")
    java
    application
    id("com.github.johnrengelman.shadow") version "6.0.0"
    //id("com.google.protobuf") version "0.8.12"
}

repositories {
    mavenCentral()
    jcenter()
    maven("https://plugins.gradle.org/m2/")
}

application {
    mainClassName = "demo.MainKt"
}

val log4jVersion = project.property("log4jVersion")
val neo4jVersion = "4.1.1"
val gremlinVersion = project.property("gremlinVersion")

dependencies {
    implementation(kotlin("stdlib-jdk8"))

    implementation(project(":lib"))

    // jvm-libp2p implementation
    implementation("io.libp2p:jvm-libp2p-minimal:0.5.5-RELEASE")

    // commandline parser
    implementation("com.github.ajalt:clikt:2.8.0")

    // embedded Neo4j graph database
    implementation("org.neo4j:neo4j:$neo4jVersion")
    // Allow Bolt connection for database debugging
    implementation("org.neo4j:neo4j-bolt:$neo4jVersion")

    // logging framework
    implementation("org.apache.logging.log4j:log4j-api:$log4jVersion")
    implementation("org.apache.logging.log4j:log4j-core:$log4jVersion")
    implementation("org.apache.logging.log4j:log4j-slf4j-impl:$log4jVersion")

    implementation("com.fasterxml.jackson.dataformat:jackson-dataformat-yaml:2.11.2")

    // Required for protobuf
    if (JavaVersion.current().isJava9Compatible) {
        // Workaround for @javax.annotation.Generated
        // see: https://github.com/grpc/grpc-java/issues/3633
        implementation("javax.annotation:javax.annotation-api:1.3.2")
    }
}

tasks {
    compileKotlin {
        kotlinOptions {
            jvmTarget = "1.8"
        }
    }

    compileTestKotlin {
        kotlinOptions {
            jvmTarget = "1.8"
        }
    }
}