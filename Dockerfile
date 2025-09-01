# Используем Nginx для статического хостинга
FROM nginx:alpine

# Копируем статические файлы в директорию Nginx
COPY ["Pikman Studio_ Expert Web Development, E-commerce, and UX_UI Design.html", "/usr/share/nginx/html/index.html"]
COPY ["Pikman Studio_ Expert Web Development, E-commerce, and UX_UI Design_files/", "/usr/share/nginx/html/files/"]

# Создаем кастомную конфигурацию Nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Настройки для статических файлов \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]