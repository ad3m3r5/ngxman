import 'dotenv/config';
import './utils/globals.js'
import express from 'express';
import http from 'http';
import path from 'path';
import { logger } from './utils/logger.js';

// import express router
import routes from './routes/index.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';

import './utils/init.js';

const app = express();

// configure express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use express router
app.use('/', routes);

// serve vue site
if (process.env.NODE_ENV !== 'development') {
  try {
    const frontendPath = path.join(global.__rootDir, '/frontend-build');
    const frontendIndex = path.join(frontendPath, 'index.html');

    app.use(express.static(frontendPath));

    app.get('/{*any}', (req, res) => {
      res.sendFile(frontendIndex);
    });
  } catch (error) {
    logger(error, 'error', 'error');
    throw new Error("Unable to serve frontend-build directory");
  }
}

// error handling
app.use(notFoundHandler);
app.use(errorHandler);

// start http server
let server = http.createServer(app);
server.listen(global.PORT, global.ADDRESS);

server.on('listening', () => {
  if (global.LOG_LEVELS[global.LOG_LEVEL] >= global.LOG_LEVELS['DEBUG']) {
    logger(`Server properties: ${JSON.stringify(server.address())}`, 'debug', 'debug');
  } else {
    logger(`Server listening: ${server.address().address}:${server.address().port}`, 'info', 'emergency');
  }
});

// http keep-alive
//   helps avoid an abrupt shutdown on SIGINT
server.on('connection', function (socket) {
  socket.setTimeout(5 * 1000);
});

// shutdown on SIGTERM
process.on('SIGTERM', () => {
  logger("Received SIGTERM: Server shutting down", 'debug', 'debug');
  server.close(() => {
    logger("Server shut down", 'debug', 'debug');
  });
});

// shutdown on SIGINT
process.on('SIGINT', () => {
  logger("Received SIGINT: Server shutting down", 'debug', 'debug');
  process.exit(0);
});
