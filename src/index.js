// Import dotenv Library
require('dotenv').config();

const express = require('express');
const app = express();
// Port variable
const PORT = process.env.PORT || 3000;

const routes = require('./routes');
const { connectToDB } = require('./utils/db');

// app.use('/', function(req, res) {
//   return res.send('Hello World');
// });

// express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());
app.use('/api/v1', routes);
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})