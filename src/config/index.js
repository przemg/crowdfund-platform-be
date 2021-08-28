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
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;
