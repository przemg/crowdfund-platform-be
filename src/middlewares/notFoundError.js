import AppError from '../utils/AppError.js';
import { RESOURCE_NOT_FOUND } from '../data/commonErrors.js';

const notFoundError = () => {
  throw new AppError(RESOURCE_NOT_FOUND, { customMessage: 'Looked up endpoint cannot be found' });
};

export default notFoundError;
