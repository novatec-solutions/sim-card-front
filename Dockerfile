FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

RUN apk update && \
    apk add nodejs npm 

RUN npm ci 
RUN npm run build --prod

RUN rm -rf /usr/share/nginx/html/*

RUN cp -r /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]