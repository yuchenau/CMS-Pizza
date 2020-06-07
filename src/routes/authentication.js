const express = require('express');
const {
    loginUser,
} = require('../controllers/authentication');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;