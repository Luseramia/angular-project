FROM nginx:alpine

ARG APP_NAME=angular-project

COPY dist/$APP_NAME /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
