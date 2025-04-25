import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
global.__rootDir = path.join(__dirname, '..');

global.ADDRESS = process.env.ADDRESS || '0.0.0.0';
global.PORT = process.env.PORT || 3000;
global.NGINX_CONF_DIR = process.env.NGINX_CONF_DIR || '/etc/nginx/conf.d';
global.LOCAL_CONF_DIR = process.env.LOCAL_CONF_DIR || '/conf';
global.CERTS_DIR = process.env.CERTS_DIR || '/certs';

// allow LOG_LEVEL to be any case
if ('LOG_LEVEL' in process.env) {
  // verbosity numbers based on syslog - https://en.wikipedia.org/wiki/Syslog#Severity_level
  let logLevel = process.env.LOG_LEVEL.trim().toUpperCase();
  if (logLevel === 'EMERGENCY' || logLevel === 'EMERG' || logLevel === 'PANIC' || logLevel === '0') {
    global.LOG_LEVEL = 'EMERGENCY';
  } if (logLevel === 'ALERT' || logLevel === '1') {
    global.LOG_LEVEL = 'ALERT';
  } if (logLevel === 'CRITICAL' || logLevel === 'CRIT' || logLevel === '2') {
    global.LOG_LEVEL = 'CRITICAL';
  } if (logLevel === 'ERROR' || logLevel === 'ERR' || logLevel === '3') {
    global.LOG_LEVEL = 'ERROR';
  } if (logLevel === 'WARNING' || logLevel === 'WARN' || logLevel === '4') {
    global.LOG_LEVEL = 'WARNING';
  } if (logLevel === 'NOTICE' || logLevel === '5') {
    global.LOG_LEVEL = 'NOTICE';
  } else if (logLevel === 'INFO' || logLevel === '6') {
    global.LOG_LEVEL = 'INFO';
  } else if (logLevel === 'DEBUG' || logLevel === '7') {
    global.LOG_LEVEL = 'DEBUG';
  } else {
    console.error(`Invalid LOG_LEVEL provided [${process.env.LOG_LEVEL}], defaulting to INFO`);
    global.LOG_LEVEL = 'INFO';
  }
} else {
  global.LOG_LEVEL = 'INFO';
}

global.LOG_LEVELS = {
  EMERGENCY: 0,
  ALERT: 1,
  CRITICAL: 2,
  ERROR: 3,
  WARNING: 4,
  NOTICE: 5,
  INFO: 6,
  DEBUG: 7
}

// debug output
let globals = `
globals.js:
    __dirname: ${__dirname}
    global.__rootDir: ${global.__rootDir}

    global.ADDRESS: ${global.ADDRESS}
    global.PORT: ${global.PORT}
    global.LOG_LEVEL: ${global.LOG_LEVEL}
    global.NGINX_CONF_DIR: ${global.NGINX_CONF_DIR}
    global.LOCAL_CONF_DIR: ${global.LOCAL_CONF_DIR}
    global.CERTS_DIR: ${global.CERTS_DIR}
`;

logger(globals, 'debug', 'debug');
