import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectDetailsController,
} from '../controllers/projectsController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createProjectValidation } from '../middlewares/validators/index.js';
import multer from '../config/multer.js';

const getProjectsRoutes = () => {
  const router = express.Router();

  router
    .route('/')
    .get(isAuthenticated(), getAllProjectsController)
    .post(
      isAuthenticated(),
      multer.fields([
        { name: 'brandLogo', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
      ]),
      createProjectValidation,
      createProjectController,
    );

  router.get('/:projectId', isAuthenticated(), getProjectDetailsController);

  return router;
};

export { getProjectsRoutes };
