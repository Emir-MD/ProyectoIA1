# Usa Python 3.9 como base
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todo el contenido de la carpeta `ai_service/` al contenedor
COPY . /app

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 5001
EXPOSE 5001

# Comando para ejecutar el servicio
CMD ["python", "/app/main.py"]
