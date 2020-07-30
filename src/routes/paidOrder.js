const express = require('express');
const router = express.Router();
const {
    updateOrderStatus,
    getOrder,
    getAllOrders,
    deleteOrders
} = require('../controllers/paidOrder');

router.put('/:id', updateOrderStatus);
router.get('/:id', getOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrders);



module.exports = router;