import express from 'express';
import {
  signupController,
  loginController,
  logoutController,
} from '../controllers/authenticationController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { signupValidation, loginValidation } from '../middlewares/validators/index.js';

const getAuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/signup', isAuthenticated(true), signupValidation, signupController);
  router.post('/login', isAuthenticated(true), loginValidation, loginController);
  router.delete('/logout', isAuthenticated(), logoutController);

  return router;
};

export { getAuthenticationRoutes };
