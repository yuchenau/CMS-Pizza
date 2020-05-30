// Import mongoose Customer Model
const customerModel = require('../models/customer');

async function addCustomer(req, res) {
    const { firstName, lastName } = req.body;
    // New a customer document
    const customer = new customerModel({
        firstName, lastName,
    });
    await customer.save();
    res.status(201).send(customer);
}

async function getCustomer(req, res) {
    // Rename id to code (Redundant)
    const { id:code } = req.params;
    const customer = await customerModel.findById(code);
    // If id not found
    if (!customer) {
        return res.status(404).send('Customer not found');
    }
    return res.send(customer);
}

async function getAllCustomer(req, res) {
    // exec() refers to execute immediately
    const customers = await customerModel.find().exec();
    return res.send(customers);
}

async function updateCustomer(req, res) {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const updatedCustomer = await customerModel.findByIdAndUpdate(id,
        { firstName, lastName },
        { new: true},);
    if (!updateCustomer) {
        return res.status(404).send('Customer not found');
    }
    return res.send(updateCustomer);
}

async function deleteCustomer(req, res) {
    const { id } = req.params;
    const deletedCustomer = await customerModel.findByIdAndDelete(id);
    if (!deletedCustomer) {
        return res.status(404).send('Customer not found');
    }
    return res.sendStatus(200);
}

module.exports = {
    addCustomer,
    getCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer
}