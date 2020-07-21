const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const {
    // getCurrentCustomer,
    addCustomer,
    getCustomer,
    deleteCustomer
} = require('../controllers/customers');

// router.get('/me', authGuard, getCurrentUser);
router.get('/:id',authGuard, getCustomer);
router.post('/', addCustomer);
router.delete('/:id', deleteCustomer);


module.exports = router;
