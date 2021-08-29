import express from 'express';
import { getAccountsRoutes } from './accounts.js';
import { getAuthenticationRoutes } from './authentication.js';
import { getProjectsRoutes } from './projects.js';

const getRoutes = () => {
  const router = express.Router();

  router.use('/auth', getAuthenticationRoutes());
  router.use('/projects', getProjectsRoutes());
  router.use('/accounts', getAccountsRoutes());

  return router;
};

export { getRoutes };
