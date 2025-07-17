# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Salin file project (hanya yang dibutuhkan)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua source code
COPY . .

# Build Vue app
RUN npm run build


# Stage 2: NGINX untuk serve hasil build
FROM nginx:alpine

COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy hasil build dari stage builder ke folder HTML nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
