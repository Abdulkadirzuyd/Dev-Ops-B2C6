# Stap 1: bouw met Node
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stap 2: serve met NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
