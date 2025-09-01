#!/bin/bash

# Скрипт для настройки SSL сертификата
DOMAIN="true-scale.ru"
EMAIL="vladvolkov.work@gmail.com"

echo "Настройка SSL для домена: $DOMAIN"

# Создаем директории
mkdir -p ssl
mkdir -p src/.well-known/acme-challenge

# Запускаем сайт без SSL
echo "Запускаем сайт без SSL..."
docker-compose up -d truescale-site

# Ждем запуска nginx
sleep 10

# Получаем SSL сертификат
echo "Получаем SSL сертификат..."
docker-compose run --rm certbot

# Обновляем nginx конфигурацию для HTTPS
echo "Обновляем nginx конфигурацию для HTTPS..."
sed -i.bak 's/# server {/server {/g' nginx.conf
sed -i.bak 's/# }/}/g' nginx.conf
sed -i.bak 's/#     /    /g' nginx.conf

# Перезапускаем с SSL
echo "Перезапускаем с SSL..."
docker-compose restart truescale-site

echo "SSL настроен успешно!"
echo "Ваш сайт доступен по адресу: https://$DOMAIN"