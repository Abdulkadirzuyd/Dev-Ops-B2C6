# Stap 1: bouw met Node
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stap 2: serve met NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

<<<<<<< HEAD
EXPOSE 80
=======
# Expose poort 80
EXPOSE 80

>>>>>>> 37e6292 (Ignore .vs and push frontend changes)
CMD ["nginx", "-g", "daemon off;"]
