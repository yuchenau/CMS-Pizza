const express = require('express');
const {
    addCustomer,
    getCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customers')

const router = express.Router();

router.post('/', addCustomer);
router.delete('/:id', deleteCustomer);
router.put('/:id', updateCustomer);
router.get('/:id', getCustomer);
router.get('/', getAllCustomer);

module.exports = router;