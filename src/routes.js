const express = require('express');

const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');

const router = express.Router();

router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);

module.exports = router;