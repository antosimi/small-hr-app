# Build JAR, creates a docker container with maven that will not try to run the app, but it will create JAR
# This way no errors are thrown because of missing DB connection etc.
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests


# Stage 2: Runtime
FROM eclipse-temurin:17-jdk AS runtime
WORKDIR /app
#COPY --from=build /app/target/hrApp-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-Dspring.devtools.restart.enabled=true", "-jar", "/app/target/hrApp-0.0.1-SNAPSHOT.jar"]
