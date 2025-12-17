# build stage
FROM node:20-alpine AS build
WORKDIR /app

# copiăm package.json și instalăm deps
COPY hrApp_frontend_react/package*.json ./
RUN npm install

# copiăm restul codului
COPY hrApp_frontend_react/ .
RUN npm run build

# serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
