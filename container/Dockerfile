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
ARG APP_DIR=/app

USER root

# Set ENV
ENV NODE_ENV=production \
  ENTRYPOINT=$APP_DIR/init.sh \
  DATA_DIR=/data

# Configure user and group
RUN addgroup -S -g 1000 web \
  && adduser -S -u 1000 node -G web -h $APP_DIR \
  && addgroup nginx web \
  && mkdir -p $APP_DIR $DATA_DIR $DATA_DIR/conf $DATA_DIR/certs $DATA_DIR/logs \
  && rm -f /var/log/nginx/* \
  && ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
  && ln -sf /proc/1/fd/2 /var/log/nginx/error.log \
  && rm -f /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf \
  && chown -R node:web $APP_DIR $DATA_DIR \
  && chown -R nginx:web /etc/nginx

# Copy NGINX files
COPY --chown=nginx:web container/nginx.conf.template /etc/nginx/nginx.conf.template

USER node
WORKDIR $APP_DIR

# Copy app and dependencies
COPY --chown=node:web package.json ./package.json
COPY --chown=node:web package-lock.json ./package-lock.json
RUN npm ci --omit=dev
COPY --chown=node:web backend ./backend
COPY --chown=node:web frontend ./frontend
COPY --chown=node:web --chmod=0775 container/init.sh $APP_DIR/init.sh

EXPOSE 8080 8443 3000

# Start nginx and ngxman
#CMD ["sh", "-c", "nginx && node server.js"]
ENTRYPOINT ["/bin/sh", "-c", "$ENTRYPOINT"]
