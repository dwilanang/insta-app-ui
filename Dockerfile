# Dockerfile

FROM nginx:stable-alpine

# Copy hasil build lokal ke nginx
COPY ./dist /usr/share/nginx/html

# Ganti default nginx config kalau perlu (opsional)
COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
