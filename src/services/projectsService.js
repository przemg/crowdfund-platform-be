import { PASSED_DATA_EXISTS } from '../data/commonErrors.js';
import project from '../models/project.js';
import AppError from '../utils/AppError.js';
import cloudinary from '../config/cloudinary.js';

export const createProjectService = async ({
  account,
  title,
  shortDescription,
  about,
  dueDate,
  backingAmountGoal,
  brandColor,
  rewards,
  photo: [photo],
  brandLogo: [brandLogo],
}) => {
  const projectExist = await project.findOne({ title }).lean();
  if (projectExist) {
    throw new AppError(PASSED_DATA_EXISTS, {
      customMessage: 'Project with the given name already exists, please try something else',
    });
  }

  const brandLogoResponse = await cloudinary.uploader.upload(brandLogo.path);
  const photoResponse = await cloudinary.uploader.upload(photo.path);

  const rewardsJSON = JSON.parse(rewards);

  const projectRecord = await project.create({
    account: account._id,
    title,
    shortDescription,
    about,
    dueDate,
    backingAmountGoal,
    brandColor,
    rewards: rewardsJSON,
    photo: photoResponse.public_id,
    brandLogo: brandLogoResponse.public_id,
  });

  return {
    account,
    title: projectRecord.title,
    shortDescription: projectRecord.shortDescription,
    about: projectRecord.about,
    dueDate: projectRecord.dueDate,
    backingAmountGoal: projectRecord.backingAmountGoal,
    brandColor: projectRecord.brandColor,
    rewards: projectRecord.rewards,
    photo: cloudinary.url(projectRecord.photo),
    brandLogo: cloudinary.url(projectRecord.brandLogo),
  };
};

export const getAllProjectsService = async () => {
  const projectsList = await project
    .find({})
    .populate({ path: 'account', select: '_id name email' })
    .lean();

  return projectsList;
};
