import multer from 'multer';
import path from 'path';
import { DATA_VALIDATION_ERROR } from '../data/commonErrors.js';
import { acceptableFileExtensions, maxFileSize } from '../data/sendedFilesData.js';
import AppError from '../utils/AppError.js';

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);

    if (!acceptableFileExtensions.includes(fileExtension)) {
      cb(
        new AppError(DATA_VALIDATION_ERROR, {
          customMessage: `Inappropriate file extension for ${
            file.fieldname
          }. You can only send images with extensions: ${acceptableFileExtensions.join(', ')}`,
        }),
        false,
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: maxFileSize,
  },
});

export default multerConfig;
