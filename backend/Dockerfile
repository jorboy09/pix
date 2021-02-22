FROM node:lts
ARG API_HOST
ARG EMAIL
WORKDIR /usr/src/app
COPY . .
RUN apt-get -y update && \
    apt-get -y install apt-utils && \
    apt-get -y install curl && \
    apt-get -y install sudo && \
    apt-get -y update && \
    apt-get -y install build-essential nginx htop postgresql postgresql-contrib && \
    service nginx start && \
    service postgresql start && \
    sudo -u postgres psql -c "CREATE DATABASE pix;" && \
    sudo -u postgres psql -c "CREATE USER pix_creator with PASSWORD '123321' SUPERUSER;" && \
    apt-get -y update && \
    apt-get -y install software-properties-common && \
    apt-get -y update && \
    apt-get -y install python3-certbot-nginx 

EXPOSE 80
WORKDIR ./
COPY default.config /etc/nginx/sites-available/default
CMD chmod 666 /etc/nginx/sites-available/default && \
    python3 replace_nginx.py $API_HOST && \
    nginx -t && \
    chmod +x ./restart_nginx.sh && \
    ./restart_nginx.sh &&\
    certbot --nginx --keep -n --agree-tos -m $EMAIL -d $API_HOST --redirect --expand && \
    (crontab -l 2>/dev/null; echo "0 0 */1 * * certbot renew") | crontab - && \ 
    sudo service postgresql start && \
    yarn && \
    yarn knex migrate:latest && \
    yarn knex seed:run && \
    node --max-old-space-size=1024 index.js
