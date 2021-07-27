import config from './index.js';

export const csrfConfig = {
  cookie: true,
  httpOnlny: true,
  secure: config.env === 'production',
  sameSite: true,
};
