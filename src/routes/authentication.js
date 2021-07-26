import express from 'express';
import { signupController, loginController } from '../controllers/authenticationController.js';
import { signupValidation, loginValidation } from '../middlewares/validators/index.js';

const getAuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/signup', signupValidation, signupController);
  router.post('/login', loginValidation, loginController);

  return router;
};

export { getAuthenticationRoutes };
