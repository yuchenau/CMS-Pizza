// Library dotenv
require('dotenv').config();
const express = require('express');
// library express async errors
// require('express-async-errors');

const routes = require('./routes');
const { connectToDB } = require('./utils/db');
// const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3000;

// express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());
app.use('/api/v1', routes);
// app.use(errorHandler);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})