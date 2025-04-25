# Installing

## Table of Contents
  - [README](../README.md)
  - [Environment Variables](#environment-variables)
  - [Docker](#docker)
    - [Docker Compose](#docker-compose)
    - [Docker Run](#docker-run)
  - [npm or yarn](#npm-or-yarn)
  - [Run as a Service with pm2](#run-as-a-service-with-pm2)

### Environment Variables

All of the variables below are optional, as the default work fine.

- `ADDRESS`
  - Default: `0.0.0.0`
- `PORT`
  - Default: `3000`
- `LOG_LEVEL`
  - Default: `INFO`
  - Options: [Syslog](https://en.wikipedia.org/wiki/Syslog#Severity_level)
- `DATA_DIR`
  - Default: `/data`
- `NGINX_CONF_DIR`
  - Default: `/etc/nginx/conf.d`
- `LOCAL_CONF_DIR`
  - Default: `$DATA_DIR/conf`
- `CERTS_DIR`
  - Default: `$DATA_DIR/certs`
- `LOGS_DIR`
  - Default: `$DATA_DIR/logs`

### Docker

Prep:
```
mkdir -p /opt/containers/ngxman/data/{conf,certs,logs}
chown -R 1000:1000 /opt/containers/ngxman/conf
cd /opt/containers/ngxman
```

#### Docker Compose

```
wget https://raw.githubusercontent.com/ad3m3r5/ngxman/refs/heads/main/docs/compose.yaml

docker compose up -d
```

#### Docker Run

```
docker run -d --restart=always \
  --name ngxman -p 80:8080 -p 443:8443 -p 3000:3000 \
  -e LOG_LEVEL=INFO \
  -v /opt/containers/ngxman/data:/data \
  ad3m3r5/ngxman:latest
```

### Run as a Service with pm2

This varies depending on the OS, however I would recommend checking out [pm2](https://pm2.keymetrics.io/).

The directory for nginx will also need to be specified with environment variables.

Example of pm2 command: `LOG_LEVEL=INFO pm2 start server.js --name ngxman`
