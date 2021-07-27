import mongoose from 'mongoose';
import logger from 'loglevel';
import config from '../config/index.js';

const connect = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  logger.info('Successfully connected to the database');
};

export default connect;
