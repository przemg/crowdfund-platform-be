import { createProjectService } from '../services/projectsService.js';

export const createProjectController = async (req, res) => {
  const { title, shortDescription, about, dueDate, backingAmountGoal, brandColor, rewards } =
    req.body;
  const { photo, brandLogo } = req.files;

  const projectRecord = await createProjectService({
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
