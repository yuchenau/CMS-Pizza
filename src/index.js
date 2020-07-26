require("dotenv").config();
require('express-async-errors');
const express = require("express");
const routes = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

const logger = require('./utils/logging');

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);
app.use(helmet());
app.use(morgan("common"));

logger.handleErrorLog();
logger.handleUnexpectedErrorLog();



const PORT = process.env.PORT || 3000;


connectToDB().then(() => {
  app.listen(PORT, () => {
    logger.logger.info(`Server listening on port ${PORT}`);
  });
});
