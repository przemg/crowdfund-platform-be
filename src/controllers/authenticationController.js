import { signupService, loginService } from '../services/authenticationService.js';

export const signupController = async (req, res) => {
  const { email, name, password } = req.body;

  const accountRecord = await signupService({ email, name, password });
  const accountInfo = {
    _id: accountRecord._id,
    email: accountRecord.email,
    name: accountRecord.name,
  };

  req.session.account = accountInfo;

  res.status(201).json({
    message: 'User successfully created',
    data: accountInfo,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const accountRecord = await loginService({ email, password });
  const accountInfo = {
    _id: accountRecord._id,
    email: accountRecord.email,
    name: accountRecord.name,
  };

  req.session.account = accountInfo;

  res.status(200).json({
    message: 'Successfully logged in',
    data: accountInfo,
  });
};

export const logoutController = (req, res) => {
  req.session.destroy(() => res.status(200).json({ message: 'Successfully logged out' }));
};

export const getAuthenticatedUserDataController = (req, res) => {
  const { account } = req.session;

  res.status(200).json({
    message: 'Data of authenticated user successfully returned',
    data: account,
  });
};

export const getCsrfTokenController = (req, res) => {
  res.status(200).json({ csrfToken: req.csrfToken() });
};
