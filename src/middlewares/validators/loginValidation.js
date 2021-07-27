import * as yup from 'yup';
import AppError from '../../utils/AppError.js';
import { DATA_VALIDATION_ERROR } from '../../data/commonErrors.js';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loginValidation = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch ({ errors }) {
    throw new AppError(DATA_VALIDATION_ERROR, { details: errors });
  }
};

export default loginValidation;
