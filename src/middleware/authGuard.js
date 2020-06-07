const {
    verifyToken
} = require('../utils/jwt')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Access denied');
    }
    const contentArray = authHeader.split(' ');
    if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
        return res.status(401).send('Invalid token format');
    }
    const decoded = verifyToken(contentArray[1]);
    if (!decoded) {
        return res.status(401).send('Access denied');
    }
    req.user = decoded;
    return next();
}