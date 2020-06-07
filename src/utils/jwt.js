const jwt = require('jsonwebtoken');

// Sign token
function generateToken(id) {
    const token = jwt.sign({id}, process.env.JWT_KEY, {expiresIn:"24h"});
    return token;
}

// Verify token
function verifyToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch(e) {
        return null;
    }
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}