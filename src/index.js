import logger from 'loglevel';
import { startServer } from './server.js';

logger.setLevel('info');

startServer();
