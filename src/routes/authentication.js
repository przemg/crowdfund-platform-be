import express from 'express';
import {
  signupController,
  loginController,
  logoutController,
  getAuthenticatedUserDataController,
  getCsrfTokenController,
} from '../controllers/authenticationController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { authenticationValidation } from '../middlewares/validators/index.js';

const { signupValidation, loginValidation } = authenticationValidation;

const getAuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/signup', isAuthenticated(true), signupValidation, signupController);
  router.post('/login', isAuthenticated(true), loginValidation, loginController);
  router.delete('/logout', isAuthenticated(), logoutController);
  router.get('/me', isAuthenticated(), getAuthenticatedUserDataController);
  router.get('/csrf-token', getCsrfTokenController);

  return router;
};

export { getAuthenticationRoutes };
