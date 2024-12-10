# use maven to build application
FROM maven:3.6.3-jdk-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# use openJdk to run the application
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/KLTN_BE-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]