const jwt = require('jsonwebtoken');

const secret = 'long secret';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxNTM3NDgxfQ.QoY8JQ9fpGn1Vkazm9xKJXVRO6T2WrjBwBwOjWg355I';

const valid = jwt.verify(token, secret);
console.log(valid);