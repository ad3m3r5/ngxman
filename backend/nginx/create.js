import { writeFile } from 'fs/promises';
import { exists } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function create(name, content) {
  try {
    let filename = `${global.NGINX_CONF_DIR}/${name}.conf`;
    let filenameDisabled = `${global.NGINX_CONF_DIR}/${name}.conf.disabled`;

    const confExists = await exists(filename, 'file');
    const confExistsDisabled = await exists(filenameDisabled, 'file');

    if (confExists || confExistsDisabled) {
      logger(`Site [${name}] already exists`, 'error', 'info');
      return { success: false, message: `Site [${name}] already exists` }
    } else {
      await writeFile(filename, content);
      return { success: true, message: `${name}.conf has been created` }
    }
  } catch (error) {
    logger('Failed to read nginx configuration file', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to read nginx configuration file');
  }
}
