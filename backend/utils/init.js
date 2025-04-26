import fs from 'fs';
import path from 'path';
import { existsSync, createSymlinkSync } from './helpers.js';
import { logger } from './logger.js';

try {
  const nginxConfDirExists = existsSync(global.NGINX_CONF_DIR, 'dir');
  const localConfDirExists = existsSync(global.LOCAL_CONF_DIR, 'dir');
  const certDirExists = existsSync(global.CERTS_DIR, 'dir');
  const logDirExists = existsSync(global.LOGS_DIR, 'dir');

  // nginx
  try {
    // create
    if (!nginxConfDirExists) {
      fs.mkdirSync(global.NGINX_CONF_DIR, { recursive: true });
    }
    // access
    fs.accessSync(global.NGINX_CONF_DIR);
    // clean
    const nginxFiles = fs.readdirSync(global.NGINX_CONF_DIR);
    const nginxConfFiles = nginxFiles.filter(file => file.toLowerCase().endsWith('.conf') || file.toLowerCase().endsWith('.conf.disabled'));
    logger(`${global.NGINX_CONF_DIR} conf files: ${nginxConfFiles.length}`, 'debug', 'debug');
    nginxConfFiles.forEach(file => {
      let nginxFilePath = path.join(global.NGINX_CONF_DIR, file);
      // confirm its a file
      if (existsSync(nginxFilePath)) {
        fs.unlinkSync(nginxFilePath);
        logger(`Deleted nginx conf: ${nginxFilePath}`, 'debug', 'debug');
      }
    });
  } catch (error) {
    throw new Error(`Error accessing, creating, or cleaning nginx conf dir: ${global.NGINX_CONF_DIR}`);
  }

  // conf
  try {
    // create
    if (!localConfDirExists) {
      fs.mkdirSync(global.LOCAL_CONF_DIR, { recursive: true });
    }
    // access
    fs.accessSync(global.LOCAL_CONF_DIR);
  } catch (error) {
    throw new Error(`Error accessing or creating conf dir: ${global.LOCAL_CONF_DIR}`);
  }

  // conf/*.conf
  try {
    const localFiles = fs.readdirSync(global.LOCAL_CONF_DIR);
    const localConfFiles = localFiles.filter(file => file.toLowerCase().endsWith('.conf') || file.toLowerCase().endsWith('.conf.disabled'));
    logger(`${global.LOCAL_CONF_DIR} conf files: ${localConfFiles.length}`, 'debug', 'debug');
    localConfFiles.forEach(file => {
      let localFilePath = path.join(global.LOCAL_CONF_DIR, file);
      let nginxFilePath = path.join(global.NGINX_CONF_DIR, file);
      // confirm its a file
      if (existsSync(localFilePath, 'file')) {
        createSymlinkSync(localFilePath, nginxFilePath, 'file');
      }
    });
  } catch (error) {
    throw new Error(`Error accessing or symlinking conf file`);
  }

  // certs
  try {
    // create
    if (!certDirExists) {
      fs.mkdirSync(global.CERTS_DIR, { recursive: true });
    }
    // access
    fs.accessSync(global.CERTS_DIR);
  } catch (error) {
    throw new Error(`Error accessing or creating certs dir: ${global.CERTS_DIR}`);
  }

  // logs
  try {
    // create
    if (!logDirExists) {
      fs.mkdirSync(global.LOGS_DIR, { recursive: true });
    }
    // access
    fs.accessSync(global.LOGS_DIR);
  } catch (error) {
    throw new Error(`Error accessing or creating logs dir: ${global.LOGS_DIR}`);
  }
} catch(error) {
  logger(error, 'error', 'error');
  throw error;
}
