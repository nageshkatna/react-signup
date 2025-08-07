FROM node:20.19.0-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx on PORT 8080
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config to listen on port 8080 (required by Cloud Run)
RUN sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
