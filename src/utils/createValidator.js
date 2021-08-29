import { DATA_VALIDATION_ERROR } from '../data/commonErrors.js';
import AppError from './AppError.js';

const createValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate({ ...req.body, files: req.files }, { abortEarly: false });
    next();
  } catch ({ errors }) {
    throw new AppError(DATA_VALIDATION_ERROR, { details: errors });
  }
};

export default createValidator;
