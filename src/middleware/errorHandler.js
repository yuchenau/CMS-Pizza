const winston = require('winston');

module.exports = (err, req, res, next) => {
  // logging error with winston
  winston.error(err.message, err);

  console.error(err); 
  return res.status(500).json("Unexpected Failure");
};
