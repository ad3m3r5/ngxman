import { exec } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function dump() {
  try {
    const { stdout, stderr } = await exec('nginx -T');
    if (stderr) return stderr;
    return stdout;
  } catch (error) {
    logger('Failed to dump nginx config', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to test nginx config');
  }
}
