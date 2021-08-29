import { getUserProjectsService } from '../services/accountsService.js';

export const getUserProjectsController = async (req, res) => {
  const { accountId } = req.params;
  const { limit } = req.query;

  const projectsList = await getUserProjectsService({ accountId, limit });

  res.status(200).json({ message: 'User projects list successfully returned', data: projectsList });
};
