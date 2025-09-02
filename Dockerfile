# Используем Nginx для статического хостинга
FROM nginx:alpine

# Копируем статические файлы в директорию Nginx
COPY src/ /usr/share/nginx/html/

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]