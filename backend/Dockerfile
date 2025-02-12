# Fase de compilación
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar el archivo de configuración y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y compilar la aplicación
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de ejecución
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copiar el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto del backend
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
