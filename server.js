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

const startServer = () => {
  const app = express();

  app.use(errorMiddleware);

  app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
};

export { startServer };
