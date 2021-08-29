import { RESOURCE_NOT_FOUND } from '../data/commonErrors.js';
import AppError from '../utils/AppError.js';

const isAuthorized = (req, res, next) => {
  const { account } = req.session;
  const { accountId } = req.params;

  if (account._id.toString() !== accountId) {
    throw new AppError(RESOURCE_NOT_FOUND, {
      customMessage:
        "An account with a given id doesn't exist or you don't have privileges to  get those data",
    });
  }

  next();
};

export default isAuthorized;
