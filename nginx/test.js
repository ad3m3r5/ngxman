import { exec } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function test() {
  try {
    const { stdout, stderr } = await exec('nginx -t');
    if (stderr) return stderr;
    return stdout;
  } catch (error) {
    logger('Failed to test nginx config', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to test nginx config');
  }
}
