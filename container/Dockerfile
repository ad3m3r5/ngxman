ARG NODE_VERSION=22
ARG ALPINE_VERSION=3.21

FROM node:${NODE_VERSION}-alpine AS node
FROM nginxinc/nginx-unprivileged:alpine${ALPINE_VERSION}

# Copy node
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# Set ARG
ARG APP_USER=node
ARG USER_UID=1000
ARG SHARED_GROUP=web
ARG APP_DIR=/app

USER root

# Set ENV
ENV NODE_ENV=production

# Configure user and group
RUN addgroup -S -g $USER_UID $APP_USER \
  && adduser -S -u $USER_UID $APP_USER -G $APP_USER -h $APP_DIR \
  && addgroup -S -g 1001 $SHARED_GROUP \
  && addgroup $APP_USER $SHARED_GROUP \
  && addgroup nginx $SHARED_GROUP \
  && mkdir -p $APP_DIR \
  && mkdir -p /conf /certs /logs \
  && touch /logs/access.log /logs/error.log \
  && rm -rf /var/log/nginx/* \
  && ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
  && ln -sf /proc/1/fd/2 /var/log/nginx/error.log \
  && rm -f /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf \
  && chown -R $APP_USER:$SHARED_GROUP /conf /certs /logs \
  && chown -R nginx:$SHARED_GROUP /etc/nginx/conf.d

USER $APP_USER
WORKDIR $APP_DIR

# Copy app
COPY --chown=$APP_USER:$APP_USER . .
COPY --chown=nginx:$SHARED_GROUP container/nginx.conf /etc/nginx/nginx.conf

# Install npm ackages
RUN npm install

EXPOSE 8080 8443 3000

# Start nginx and ngxman
CMD ["sh", "-c", "nginx && node server.js"]
