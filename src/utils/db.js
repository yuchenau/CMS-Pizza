const mongoose = require("mongoose");
exports.connectToDB = () => {
  // Environmental Variables
  const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

  const db = mongoose.connection;
  db.on("connected", () => {
    console.log("Database connected");
  });
  db.on("error", (error) => {
    console.log("Database connection failed");
    console.error(error.message);
    process.exit(1);
  });
  db.on("disconnected", () => {
    console.log("Database disconnected");
  });

  // Connect to MongoDB Database
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
