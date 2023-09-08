# Imagen base de Node
FROM node:18-alpine

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el package json y el .env
COPY package*.json ./
# Instalar las dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

ENV PORT 4001

#JWT
ENV JWT_SECRET AIzaSyA_pb7TdPpmpU_oxYLfVytYzLY
ENV JWT_EXPIRES_IN 8d
#Base de datos
ENV DATABASE_HOST localhost
ENV DATABASE_PORT 3306
ENV DATABASE_USERNAME root
ENV DATABASE_PASSWORD ffftickets
ENV DATABASE_NAME ffftickets


# Firebase
ENV FIREBASE_API_KEY AIzaSyA_pb7TdPpmpU_oxYLfVytYzLY-eBMeEtI
ENV FIREBASE_AUTH_DOMAIN ffftickets-bfc4b.firebaseapp.com
ENV FIREBASE_PROJECT_ID ffftickets-bfc4b
ENV FIREBASE_STORAGE_BUCKET ffftickets-bfc4b.appspot.com
ENV FIREBASE_MESSAGING_SENDER_ID 723022073787
ENV FIREBASE_APP_ID 1:723022073787:web:7923460072065609a5be9e
ENV FIREBASE_MEASUREMENT_ID G-NEYFQLD3P9

#encriptacion
ENV SECRET_KEY acab6356c9806310943face74ea9b6304f0d6d72ed59b892ee05b00c1496694d
ENV SECRET_IV 0123456789ABCDEF0123456789ABCDEF
ENV ENCRYPTION_METHOD aes-256-cbc
#email
ENV MAIL_HOST smtp.serviciodecorreo.es
ENV MAIL_PORT 465
ENV MAIL_SECURE true
ENV MAIL_USER info@ffftickets.info
ENV MAIL_PASS Gunner135.
ENV TZ America/Guayaquil
RUN npm run build

#Exponer el puerto 4001
EXPOSE 4001

# Inicializar el build de producción
CMD [ "node", "dist/main.js"]