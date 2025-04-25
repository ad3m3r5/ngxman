import { logger } from '../utils/logger.js';

export default function errorHandler(err, req, res, next) {
  logger(err.stack, 'error', 'debug');
  logger('Internal Server Error', 'error', 'error');
  return res.status(err.status || 500).json({
    message: 'Internal Server Error'
  });
}
