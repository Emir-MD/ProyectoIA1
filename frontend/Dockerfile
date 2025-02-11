# Usar una imagen base de Node.js
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build

# Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 3000
EXPOSE 3000

# Comando de inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]
