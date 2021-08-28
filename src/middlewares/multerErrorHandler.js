import logger from 'loglevel';
import multer from 'multer';
import { DATA_VALIDATION_ERROR } from '../data/commonErrors.js';
import AppError from '../utils/AppError.js';
import { maxFileSize } from '../data/sendedFilesData.js';

const multerErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    logger.error(error);

    const { code, field } = error;

    if (code === 'LIMIT_FILE_SIZE') {
      throw new AppError(DATA_VALIDATION_ERROR, {
        customMessage: `File passed for ${field} is too large to upload. The maximum supported file size is ${
          maxFileSize / 1000000
        }MB`,
      });
    }
  }

  next(error);
};

export default multerErrorHandler;
