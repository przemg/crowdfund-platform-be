import * as yup from 'yup';
import AppError from '../../utils/AppError.js';
import { DATA_VALIDATION_ERROR } from '../../data/commonErrors.js';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const loginValidation = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    next();
  } catch ({ errors }) {
    throw new AppError(DATA_VALIDATION_ERROR, { details: errors });
  }
};

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup
    .string()
    .matches(/[a-z]+ [a-z-]+/i, 'name should consist of first name and last name')
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,15}$/,
      'password should consist of 6-20 characters, at least one lowercase, one uppercase and one number',
    )
    .required(),
});

export const signupValidation = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch ({ errors }) {
    throw new AppError(DATA_VALIDATION_ERROR, { details: errors });
  }
};
