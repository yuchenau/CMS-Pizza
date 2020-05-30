const express = require('express');

const customerRoutes = require('./routes/customers');

const router = express.Router();
router.use('/customers', customerRoutes);

module.exports = router;
