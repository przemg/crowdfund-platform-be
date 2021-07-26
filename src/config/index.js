import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  databaseURL: process.env.DB_URL,
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: Number.parseInt(process.env.SESSION_MAX_AGE, 10),
  },
};

export default config;
