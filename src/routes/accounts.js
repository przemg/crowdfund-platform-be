import express from 'express';
import { getUserProjectsController } from '../controllers/accountsController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAuthorized from '../middlewares/isAuthorized.js';

const getAccountsRoutes = () => {
  const router = express.Router();

  router.get('/:accountId/projects', isAuthenticated(), isAuthorized, getUserProjectsController);

  return router;
};

export { getAccountsRoutes };
