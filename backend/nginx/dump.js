import { exec } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export async function dump() {
  try {
    const { stdout, stderr } = await exec('nginx -T');
    let filteredStdout = '';
    let filteredStderr = '';

    const stderrLines = stderr.split('\n').filter(line => line.trim() !== '');
    
    if (stderrLines.length == 2 &&
      stderrLines[0].includes('syntax is ok') &&
      stderrLines[1].includes('test is successful')
    ) {
      filteredStdout = stderr + stdout;
    } else {
      filteredStdout = stdout;
      filteredStderr = stderr;
    }

    if (filteredStderr != '') return filteredStderr;
    return filteredStdout;
  } catch (error) {
    logger('Failed to dump nginx config', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to test nginx config');
  }
}
