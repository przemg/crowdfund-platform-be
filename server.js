import express from "express";
import logger from "loglevel";
import config from "./config/index.js";

// simple async/await error handling
import "express-async-errors";

const startServer = () => {
  const app = express();

  app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
};

export { startServer };
