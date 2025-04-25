import { readdir } from 'fs/promises';
import { exists } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function get() {
  try {
    const confDirExists = await exists(global.NGINX_CONF_DIR, 'dir');
    if (confDirExists) {
      const files = await readdir(global.NGINX_CONF_DIR);
      return { success: true, message: files };
    } else {
      throw new Error(`${global.NGINX_CONF_DIR} does not exist`);
    }
  } catch (error) {
    logger('Failed to get nginx configuration files', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to get nginx configuration files');
  }
}
