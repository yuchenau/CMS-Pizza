const express = require('express');
const app = express();

const routes = require('./routes');
 
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.use('/api/v1', routes);
 
app.listen(3000)