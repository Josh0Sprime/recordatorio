FROM nginx:latest

COPY ./dist/recordatorio/browser/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
