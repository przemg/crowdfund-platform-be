import express from 'express';
import logger from 'loglevel';
import config from './config/index.js';

// Simple async/await error handling
import 'express-async-errors';

import { SERVER_ERROR } from './data/commonErrors.js';

// Generic error handler for situations where we didn't handle errors properly
const errorMiddleware = (error, req, res, next) => {
  // When we add a custom error handler, we need to delegate to the default Express
  // error handler, when the headers have already been sent to the client
  if (res.headersSent) {
    return next(error);
  }

  let { status, name, message } = error;

  logger.error(error);

  status ??= SERVER_ERROR.status;
  name ??= SERVER_ERROR.name;
  message ??= SERVER_ERROR.message;

  return res.status(status).json({ error: { name, message } });
};

// Ensures we close the server in the event of an error
// https://stackoverflow.com/a/14032965/971592
const setupCloseOnExit = (server) => {
  const exitHandler = async (options = {}) => {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed');
      })
      .catch((e) => {
        logger.warn('Something went wrong closing the server', e.stack);
      });

    if (options.exit) process.exit();
  };

  // Do something when app is closing
  process.on('exit', exitHandler);

  // Catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // Catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  // Catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

const startServer = () => {
  const app = express();

  app.use(errorMiddleware);

  const server = app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);

    // This block of code turns `server.close` into a promise API
    const originalClose = server.close.bind(server);
    server.close = () =>
      new Promise((resolveClose) => {
        originalClose(resolveClose);
      });

    // Ensures we close the server in the event of an error
    setupCloseOnExit(server);
  });
};

export { startServer };
