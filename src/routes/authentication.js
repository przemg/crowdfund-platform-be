import express from 'express';
import { signupController } from '../controllers/authenticationController.js';
import signupValidation from '../middlewares/validators/signupValidation.js';

const getAuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/signup', signupValidation, signupController);

  return router;
};

export { getAuthenticationRoutes };
