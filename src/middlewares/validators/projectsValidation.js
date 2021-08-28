import * as yup from 'yup';
import AppError from '../../utils/AppError.js';
import { DATA_VALIDATION_ERROR } from '../../data/commonErrors.js';

const createProjectSchema = yup.object().shape({
  title: yup.string().min(10).max(50).required(),
  shortDescription: yup.string().min(50).max(200).required(),
  about: yup.string().min(100).max(500).required(),
  backingAmountGoal: yup.number().min(500).max(10000000).required(),
  dueDate: yup.date().required(),
  rewards: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().min(5).max(50).required(),
        description: yup.string().min(150).max(500).required(),
        minPledge: yup.number().positive().required(),
        amount: yup.number().positive().required(),
      }),
    )
    .required(),
  brandColor: yup
    .string()
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'brandColor must be in hex format e.g. #000 or #000000')
    .required(),
  files: yup
    .object()
    .shape({
      brandLogo: yup.array().required('brandLogo is a required field'), // Rest of the validation is handled by multer
      photo: yup.array().required('photo is a required field'), // Rest of the validation is handled by multer
    })
    .required('brandLogo and photo are a required fields'),
});

export const createProjectValidation = async (req, res, next) => {
  try {
    await createProjectSchema.validate({ ...req.body, files: req.files }, { abortEarly: false });
    next();
  } catch ({ errors }) {
    throw new AppError(DATA_VALIDATION_ERROR, { details: errors });
  }
};
