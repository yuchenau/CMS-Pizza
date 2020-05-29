const express = require('express');

const customerRoutes = require('./routes/customers');
const restaurantRoutes = require('./routes/restaurants');

const router = express.Router();
router.use('/customers', customerRoutes);
router.use('/restaurants', restaurantRoutes);

module.exports = router;
