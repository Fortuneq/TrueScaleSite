# Используем Nginx для статического хостинга
FROM nginx:alpine

# Копируем статические файлы в директорию Nginx
COPY src/ /usr/share/nginx/html/

# Создаем кастомную конфигурацию Nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
        \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        add_header Pragma "no-cache"; \
        add_header Expires "0"; \
    } \
    \
    # CSS файлы \
    location ~* \.css$ { \
        root /usr/share/nginx/html; \
        add_header Content-Type "text/css"; \
        add_header Cache-Control "no-cache"; \
        try_files $uri =404; \
    } \
    \
    # JS файлы \
    location ~* \.js$ { \
        root /usr/share/nginx/html; \
        add_header Content-Type "application/javascript"; \
        add_header Cache-Control "no-cache"; \
        try_files $uri =404; \
    } \
    \
    # Остальные статические файлы \
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|html)$ { \
        root /usr/share/nginx/html; \
        add_header Cache-Control "no-cache"; \
        try_files $uri =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]