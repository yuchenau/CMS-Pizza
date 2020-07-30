const winston = require("winston");
require("winston-mongodb");

const handleErrorLog = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
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
