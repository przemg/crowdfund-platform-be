import {
  createProjectService,
  getAllProjectsService,
  getProjectDetailsService,
} from '../services/projectsService.js';

export const createProjectController = async (req, res) => {
  const { account } = req.session;
  const { title, shortDescription, about, dueDate, backingAmountGoal, brandColor, rewards } =
    req.body;
  const { photo, brandLogo } = req.files;

  const projectRecord = await createProjectService({
    account,
    title,
    shortDescription,
    about,
    dueDate,
    backingAmountGoal,
    brandColor,
    rewards,
    photo,
    brandLogo,
  });

  res.status(201).json({
    message: 'Project successfully created',
    data: projectRecord,
  });
};

export const getAllProjectsController = async (req, res) => {
  const projectsList = await getAllProjectsService();

  res.status(200).json({ message: 'Projects list successfully returned', data: projectsList });
};

export const getProjectDetailsController = async (req, res) => {
  const { projectId } = req.params;

  const projectRecord = await getProjectDetailsService({ projectId });

  res.status(200).json({ message: 'Project details successfully returned', data: projectRecord });
};
