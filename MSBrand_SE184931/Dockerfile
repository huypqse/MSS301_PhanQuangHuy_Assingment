FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/MSBrand_SE184931-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
