const jwt = require('jsonwebtoken');

const secret = 'long secret';
const payload = {
    id:1
}

const token = jwt.sign(payload, secret, {expiresIn:'10h'});
console.log(token);