FROM node:20-alpine

WORKDIR /app

COPY hrApp_frontend_react/package*.json ./
RUN npm install

COPY hrApp_frontend_react/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
