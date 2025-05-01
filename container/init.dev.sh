#!/bin/sh

if [ -z "$DATA_DIR" ]; then export DATA_DIR="/data"; fi
if [ -z "$LOCAL_CONF_DIR" ]; then export LOCAL_CONF_DIR="${DATA_DIR}/conf"; fi
if [ -z "$CERTS_DIR" ]; then export ERTS_DIR="${DATA_DIR}/certs"; fi
if [ -z "$LOGS_DIR" ]; then export LOGS_DIR="${DATA_DIR}/logs"; fi

mkdir -p $LOCAL_CONF_DIR $CERTS_DIR $LOGS_DIR

touch $LOGS_DIR/access.log $LOGS_DIR/error.log

envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx && npm run dev
