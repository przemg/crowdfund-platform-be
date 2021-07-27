import logger from 'loglevel';
import { CSRF_BAD_TOKEN } from '../data/commonErrors.js';

const csrfErrorHandler = (error, req, res, next) => {
  if (error.code !== 'EBADCSRFTOKEN') return next(error);

  logger.error(error);

  const { status, type, message } = CSRF_BAD_TOKEN;

  return res.status(status).json({
    error: {
      status,
      type,
      message,
    },
  });
};

export default csrfErrorHandler;
