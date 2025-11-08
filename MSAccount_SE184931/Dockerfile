FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/MSAccount_SE184931-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
