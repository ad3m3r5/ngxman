import { exec } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function stop() {
  try {
    const { stdout, stderr } = await exec('nginx -s stop');
    if (stderr) return stderr;
    return stdout;
  } catch (error) {
    logger('Failed to stop nginx', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to stop nginx');
  }
}
