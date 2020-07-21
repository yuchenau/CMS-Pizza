const express = require('express');
const router = express.Router();
const {
    getCart,
    addCart,
    addOrder,
    removeOrder,
} = require('../controllers/cart');

router.get('/:id', getCart);
router.post('/', addCart);
router.post('/:id/order', addOrder);
router.delete('/:id/order/:orderId', removeOrder);


module.exports = router;