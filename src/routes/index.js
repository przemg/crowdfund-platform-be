import express from 'express';
import { getAuthenticationRoutes } from './authentication.js';
import { getProjectsRoutes } from './projects.js';

const getRoutes = () => {
  const router = express.Router();

  router.use('/auth', getAuthenticationRoutes());
  router.use('/projects', getProjectsRoutes());

  return router;
};

export { getRoutes };
