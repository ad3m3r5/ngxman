import { unlink } from 'fs/promises';
import { exists } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function remove(name, content) {
  try {
    let filename = `${global.NGINX_CONF_DIR}/${name}.conf`;
    let filenameDisabled = `${global.NGINX_CONF_DIR}/${name}.conf.disabled`;

    const confExists = await exists(filename, 'file');
    const confExistsDisabled = await exists(filenameDisabled, 'file');

    if (confExists && confExistsDisabled) {
      logger(`A site [${name}] with both extensions exists`, 'error', 'info');
      return { success: false, message: `A site [${name}] with both extensions exists` }
    } else if (confExists) {
      await unlink(filename);
      return { success: true, message: `${name}.conf has been deleted` }
    } else if (confExistsDisabled) {
      await unlink(filenameDisabled);
      return { success: true, message: `${name}.conf.disabled has been deleted` }
    } else {
      logger(`Site [${name}] does not exist`, 'error', 'debug');
      return { success: false, message: `Site [${name}] does not exist` }
    }
  } catch (error) {
    logger('Failed to read nginx configuration file', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to read nginx configuration file');
  }
}
