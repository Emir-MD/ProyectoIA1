# Usa una imagen base que incluya Maven y JDK
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de Maven y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y compilarlo
COPY src ./src
RUN mvn clean package -DskipTests

# Crear la imagen final
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copiar el JAR generado en la fase anterior
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]

