import argon2 from 'argon2';
import account from '../models/account.js';
import AppError from '../utils/AppError.js';
import { PASSED_DATA_EXISTS, WRONG_CREDENTIALS } from '../data/commonErrors.js';

export const signupService = async ({ email, name, password }) => {
  const emailExist = await account.findOne({ email }).lean();
  if (emailExist) {
    throw new AppError(PASSED_DATA_EXISTS, {
      customMessage: 'Given email address is already in use',
    });
  }

  const hashedPassword = await argon2.hash(password);

  const accountRecord = await account.create({ email, name, password: hashedPassword });

  return accountRecord;
};

export const loginService = async ({ email, password }) => {
  const accountRecord = await account.findOne({ email }).lean();
  if (!accountRecord) throw new AppError(WRONG_CREDENTIALS);

  const validatePassword = await argon2.verify(accountRecord.password, password);
  if (!validatePassword) throw new AppError(WRONG_CREDENTIALS);

  return accountRecord;
};
