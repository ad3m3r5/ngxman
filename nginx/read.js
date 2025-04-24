import { readFile } from 'fs/promises';
import { exists } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function read(name) {
  try {
    let filename = `${global.NGINX_CONF_DIR}/${name}.conf`
    const confExists = await exists(filename, 'file');
    if (confExists) {
      const file = await readFile(filename, 'utf8');
      logger(file, 'debug', 'debug');
      return file;
    } else {
      logger(`${filename} does not exist`, 'error', 'debug');
      return {};
    }
  } catch (error) {
    logger('Failed to read nginx configuration file', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to read nginx configuration file');
  }
}
