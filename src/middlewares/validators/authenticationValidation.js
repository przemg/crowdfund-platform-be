import * as yup from 'yup';
import createValidator from '../../utils/createValidator.js';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const loginValidation = createValidator(loginSchema);

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

export const signupValidation = createValidator(signupSchema);
