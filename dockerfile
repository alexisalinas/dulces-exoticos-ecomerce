FROM eclipse-temurin:21
COPY login.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
