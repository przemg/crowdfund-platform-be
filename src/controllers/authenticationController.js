import { accountSignUpService } from '../services/authenticationService.js';

export const accountSignUpController = async (req, res) => {
  const { email, name, password } = req.body;

  const accountRecord = await accountSignUpService({ email, name, password });

  res.status(201).json({
    message: 'Account successfully created',
    data: {
      _id: accountRecord._id,
      email: accountRecord.email,
      name: accountRecord.name,
    },
  });
};
