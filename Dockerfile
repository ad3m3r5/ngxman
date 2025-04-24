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
ARG USERNAME=node
ARG USER_UID=1000
ARG APP_DIR=/app

USER root

# Set ENV
ENV NODE_ENV=production

# Install nginx
RUN rm /etc/nginx/conf.d/default.conf \
  && addgroup -S -g $USER_UID $USERNAME \
  && adduser -S -u $USER_UID $USERNAME -G $USERNAME \
  && mkdir -p $APP_DIR \
  && mkdir -p /conf \
  && chown -R node:node /conf \
  && addgroup -S webgroup \
  && addgroup nginx webgroup \
  && addgroup node webgroup \
  && chown -R nginx:webgroup /etc/nginx/conf.d

USER node
WORKDIR $APP_DIR

# Copy app
COPY --chown=node:node . .

# Install npm ackages
RUN npm install

EXPOSE 8080 8443 3000

# Start nginx and ngxman
CMD ["sh", "-c", "nginx && node server.js"]
