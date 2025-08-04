# Etapa de construcción
FROM node:20-alpine as build-stage

# Establecer directorio de trabajo
WORKDIR /app

# Configurar variable de entorno
ENV VITE_REACT_APP_BASE_URL="https://api-nexovo.kaizensoftware.com.ec"

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY eslint.config.js ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY public/ ./public/
COPY src/ ./src/
COPY index.html ./

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage

# Copiar archivos compilados desde la etapa de construcción
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx si es necesaria
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]