plugins {
  kotlin("jvm") version "1.4.0"
}

repositories {
  jcenter()
  mavenCentral()
}

allprojects {
  apply(plugin = "idea")

  group = "demo"
  version = "1.0.0-SNAPSHOT"
}

subprojects {
  ext["kotlinVersion"] = "1.3.72"
  ext["log4jVersion"] = "2.13.1"
  ext["slf4jVersion"] = "1.7.30"
  ext["gremlinVersion"] = "3.4.6"
  ext["kluentVersion"] = "1.60"
}

tasks {
  wrapper {
    gradleVersion = "6.6.1"
    distributionType = Wrapper.DistributionType.ALL
  }
}
