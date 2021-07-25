import express from 'express';
import logger from 'loglevel';
import mongoose from 'mongoose';
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

  // Connect to database
  mongoose.connect(
    config.databaseURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) throw new Error(err);
      logger.info('Successfully connected to the database');
    },
  );

  app.use(errorMiddleware);

  app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
};

// Catching unresolved and rejected promises
process.on('unhandledRejection', (reason) => {
  // Throwed reason will be captured as uncaughtException
  throw reason;
});

// Handling all uncaughted errors
process.on('uncaughtException', (error) => {
  logger.error(error);
  process.exit(1);
});

export { startServer };
