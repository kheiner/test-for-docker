FROM node:lts-alpine as build-stage
WORKDIR /app
ARG VITE_API_PORT
ENV VITE_API_PORT=$VITE_API_PORT
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
