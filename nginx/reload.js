import { exec } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function reload() {
  try {
    const { stdout, stderr } = await exec('nginx -s reload');
    if (stderr) return stderr;
    return stdout;
  } catch (error) {
    logger('Failed to reload nginx', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to reload nginx');
  }
}
