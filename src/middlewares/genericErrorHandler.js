import logger from 'loglevel';
import { SERVER_ERROR } from '../data/commonErrors.js';

// Generic error handler for situations where we didn't handle errors properly
const genericErrorHandler = (error, req, res, next) => {
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

export default genericErrorHandler;
