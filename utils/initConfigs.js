import fs from 'fs';
import path from 'path';
import { existsSync, createSymlinkSync } from './helpers.js';
import { logger } from './logger.js';

try {
  const srcConfDir = global.LOCAL_CONF_DIR;
  const dstConfDir = global.NGINX_CONF_DIR;
  const srcConfDirExists = existsSync(srcConfDir, 'dir');
  if (srcConfDirExists) {
    const files = fs.readdirSync(srcConfDir);
    logger(`${srcConfDir} files: ${files.length}`, 'debug', 'debug')
    const confFiles = files.filter(file => file.toLowerCase().endsWith('.conf'));
    confFiles.forEach(file => {
      let srcFilePath = path.join(srcConfDir, file);
      let dstFilePath = path.join(dstConfDir, file);
      // confirm its a file
      if (existsSync(srcFilePath, 'file')) {
        createSymlinkSync(srcFilePath, dstFilePath, 'file');
      }
    });
  }
} catch(error) {
  logger('Unable to read /conf contents', 'error', 'error');
  logger(error, 'error', 'debug');
  throw new error('Unable to read /conf contents');
}
