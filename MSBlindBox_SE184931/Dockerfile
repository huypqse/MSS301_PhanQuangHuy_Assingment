FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/MSBlindBox_SE184931-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
