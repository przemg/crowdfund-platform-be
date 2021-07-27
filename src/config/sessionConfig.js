import MongoStore from 'connect-mongo';
import config from './index.js';

export const sessionConfig = {
  name: 'sid',
  store: new MongoStore({
    mongoUrl: config.databaseURL,
    autoRemove: 'native',
    touchAfter: 60,
    stringify: false,
  }),
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    httpOnlny: true,
    secure: config.env === 'production',
    sameSite: true,
    maxAge: config.session.maxAge,
  },
};
