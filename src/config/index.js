import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  databaseURL: process.env.DB_URL,
};

export default config;
