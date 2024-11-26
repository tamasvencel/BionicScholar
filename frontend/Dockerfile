# Stage 1: Build the React application
FROM node:20.18.1-alpine3.19 AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Stage 2: Serve the application with NGINX
FROM nginx:1.25.4-alpine3.18

# Copy NGINX configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the React build output to NGINX's serving directory
COPY --from=build /app/dist /var/www/html/

# Expose the port that NGINX will serve on
EXPOSE 8080

# Start NGINX
ENTRYPOINT ["nginx", "-g", "daemon off;"]