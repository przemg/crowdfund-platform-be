import express from 'express';
import logger from 'loglevel';
import session from 'express-session';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import connect from './utils/connect.js';

// Simple async/await error handling
import 'express-async-errors';

import { getRoutes } from './routes/index.js';
import genericErrorHandler from './middlewares/genericErrorHandler.js';
import csrfErrorHandler from './middlewares/csrfErrorHandler.js';
import notFoundError from './middlewares/notFoundError.js';
import { sessionConfig } from './config/sessionConfig.js';
import { csrfConfig } from './config/csrfConfig.js';
import multerErrorHandler from './middlewares/multerErrorHandler.js';

const startServer = () => {
  const app = express();

  // Connect to database
  connect();

  app.use(express.json());
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(csrf(csrfConfig));

  // Mount all endpoints
  app.use('/api', getRoutes());

  // Error handling
  app.use(notFoundError);
  app.use(csrfErrorHandler);
  app.use(multerErrorHandler);
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
