import logger from 'loglevel';
import { SERVER_ERROR } from '../data/commonErrors.js';

// Generic error handler for situations where we didn't handle errors properly
const genericErrorHandler = (error, req, res, next) => {
  // When we add a custom error handler, we need to delegate to the default Express
  // error handler, when the headers have already been sent to the client
  if (res.headersSent) {
    return next(error);
  }

  logger.error(error);

  const { status = SERVER_ERROR.status, type = SERVER_ERROR.type, message } = error;

  return res
    .status(status)
    .json({ error: { status, type, message: status >= 500 ? SERVER_ERROR.message : message } });
};

export default genericErrorHandler;
