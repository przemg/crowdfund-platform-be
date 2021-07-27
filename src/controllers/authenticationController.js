import { signupService, loginService } from '../services/authenticationService.js';

export const signupController = async (req, res) => {
  const { email, name, password } = req.body;

  const accountRecord = await signupService({ email, name, password });

  req.session.accountId = accountRecord._id;

  res.status(201).json({
    message: 'Account successfully created',
    data: {
      _id: accountRecord._id,
      email: accountRecord.email,
      name: accountRecord.name,
    },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const accountRecord = await loginService({ email, password });

  req.session.accountId = accountRecord._id;

  res.status(200).json({
    message: 'Successfully logged in',
    data: {
      _id: accountRecord._id,
      email: accountRecord.email,
      name: accountRecord.name,
    },
  });
};

export const logoutController = (req, res) => {
  req.session.destroy(() => res.status(200).json({ message: 'Successfully logged out' }));
};
