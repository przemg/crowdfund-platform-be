import AppError from '../utils/AppError.js';
import { USER_UNAUTHENTICATED, USER_ALREADY_LOGGED_IN } from '../data/commonErrors.js';

const isAuthenticated =
  (denyWhenIsAuthenticated = false) =>
  (req, res, next) => {
    const { account } = req.session;
    if (!denyWhenIsAuthenticated && !account) throw new AppError(USER_UNAUTHENTICATED);
    if (denyWhenIsAuthenticated && account) throw new AppError(USER_ALREADY_LOGGED_IN);

    next();
  };

export default isAuthenticated;
