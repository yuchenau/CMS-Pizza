const mongoose = require("mongoose");
const logger = require("./logging");
exports.connectToDB = () => {
  // Environmental Variables
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }
  const db = mongoose.connection;
  db.on("connected", () => {
    logger.logger.info("Database connected");
  });
  db.on("error", (error) => {
    logger.logger.info("Database connection failed");
    logger.logger.info(error.message);
    process.exit(1);
  });
  db.on("disconnected", () => {
    logger.logger.info("Database disconnected");
  });

  // Connect to MongoDB Database
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
