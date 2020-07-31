const winston = require("winston");
require("winston-mongodb");

const handleErrorLog = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: connectionString,
      level: "info",
    })
  );
};

const handleUnexpectedErrorLog = () => {
  process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEOTION");
    winston.error(ex.message, ex);
  });

  process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN UNHANDLE REJECTION");
    winston.error(ex.message, ex);
  });
};

const logConfiguration = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const logger = winston.createLogger(logConfiguration);

module.exports = {
  handleErrorLog: handleErrorLog,
  handleUnexpectedErrorLog: handleUnexpectedErrorLog,
  logger: logger,
};
