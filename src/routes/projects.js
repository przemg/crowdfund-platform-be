import express from 'express';
import { createProjectController } from '../controllers/projectsController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createProjectValidation } from '../middlewares/validators/index.js';
import multer from '../config/multer.js';

const getProjectRoutes = () => {
  const router = express.Router();

  router.route('/').post(
    isAuthenticated(),
    multer.fields([
      { name: 'brandLogo', maxCount: 1 },
      { name: 'photo', maxCount: 1 },
    ]),
    createProjectValidation,
    createProjectController,
  );

  return router;
};

export { getProjectRoutes };
