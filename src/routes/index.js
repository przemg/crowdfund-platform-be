import express from 'express';
import { getAuthenticationRoutes } from './authentication.js';
import { getProjectRoutes } from './projects.js';

const getRoutes = () => {
  const router = express.Router();

  router.use('/auth', getAuthenticationRoutes());
  router.use('/projects', getProjectRoutes());

  return router;
};

export { getRoutes };
