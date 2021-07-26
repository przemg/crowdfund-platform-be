import express from 'express';
import logger from 'loglevel';
import mongoose from 'mongoose';
import session from 'express-session';
import config from './config/index.js';

// Simple async/await error handling
import 'express-async-errors';

import { getRoutes } from './routes/index.js';
import genericErrorHandler from './middlewares/genericErrorHandler.js';
import notFoundError from './middlewares/notFoundError.js';
import { sessionConfig } from './config/sessionConfig.js';

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

  app.use(express.json());
  app.use(session(sessionConfig));

  // Mount all endpoints
  app.use('/api', getRoutes());

  // Error handling
  app.use(notFoundError);
  app.use(genericErrorHandler);

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
