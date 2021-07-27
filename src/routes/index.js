import express from 'express';
import { getAuthenticationRoutes } from './authentication.js';

const getRoutes = () => {
  const router = express.Router();

  router.use('/auth', getAuthenticationRoutes());

  return router;
};

export { getRoutes };
