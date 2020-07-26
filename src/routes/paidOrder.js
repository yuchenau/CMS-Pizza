const express = require('express');
const router = express.Router();
const {
    updateOrderStatus
} = require('../controllers/paidOrder');

router.put('/:id', updateOrderStatus);



module.exports = router;