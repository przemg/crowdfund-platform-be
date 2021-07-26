import express from 'express';
import { accountSignUpController } from '../controllers/authenticationController.js';
import signUpValidation from '../middlewares/validators/signUpValidation.js';

const getAuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/sign-up', signUpValidation, accountSignUpController);

  return router;
};

export { getAuthenticationRoutes };
