import config from './index.js';

export const csrfConfig = {
  cookie: { httpOnly: true, secure: config.env === 'production', sameSite: true },
};
