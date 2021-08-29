import cloudinary from '../config/cloudinary.js';
import project from '../models/project.js';

export const getUserProjectsService = async ({ accountId, limit }) => {
  const projectsList = await project
    .find({ account: accountId })
    .select('account title about brandLogo brandColor photo createdAt')
    .populate({ path: 'account', select: 'name' })
    .sort({ createdAt: -1 })
    .limit(Number.parseInt(limit, 10))
    .lean();

  return projectsList.map((item) => ({
    ...item,
    brandLogo: cloudinary.url(item.brandLogo),
    photo: cloudinary.url(item.photo),
  }));
};
