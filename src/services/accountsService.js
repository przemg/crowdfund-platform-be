import cloudinary from '../config/cloudinary.js';
import project from '../models/project.js';

export const getUserProjectsService = async ({ accountId }) => {
  const projectsList = await project
    .find({ account: accountId })
    .select('account title about brandLogo photo createdAt')
    .populate({ path: 'account', select: 'name' })
    .lean();

  return projectsList.map((item) => ({
    ...item,
    brandLogo: cloudinary.url(item.brandLogo),
    photo: cloudinary.url(item.photo),
  }));
};
