// Import mongoose Order Model
const orderModel = require('../models/order');
const customerModel = require('../models/customer');

async function addOrder(req, res) {
    const {
        quantity, price, note, paymentMethod, orderTime, orderStatus 
    } = req.body;
    const order = new orderModel({
        quantity, price, note, paymentMethod, orderTime, orderStatus
    });
    await order.save();
    res.status(201).send(order);
}

async function getOrder(req, res) {
    const { id } = req.params;
    // when customer is deleted, populate('customer') will find there is no customer object 
    const order = await orderModel.findById(id).populate('customer');
    if (!order) {
        return res.status(404).send('Order not found');
    }
    return res.send(order);
}

async function getAllOrders(req, res){
    const orders = await orderModel.find().exec();
    return res.send(orders);
}

async function updateOrder(req, res) {
    const { id } = req.params;
    const {
        quantity, price, note, paymentMethod, orderTime, orderStatus
    } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(id,
        { quantity, price, note, paymentMethod, orderTime, orderStatus },
        { new: true},);
    if (!updatedOrder) {
        return res.status(404).send('Order not found');
    }
    return res.send(updatedOrder);
}

async function deleteOrder(req, res) {
    const { id } = req.params;
    const deletedOrder = await orderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
        return res.status(404).send('Order not found');
    }
    return res.sendStatus(200);
}

module.exports= {
    addOrder,
    getOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}