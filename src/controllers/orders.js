// Import mongoose Customer, Order, Pizza Model
const customerModel = require("../models/customer");
const orderModel = require("../models/order");

async function addOrder(req, res) {
  const {
    quantity,
    price,
    note,
    paymentMethod,
    orderTime,
    orderStatus,
  } = req.body;
  const order = new orderModel({
    quantity,
    price,
    note,
    paymentMethod,
    orderTime,
    orderStatus,
  });
  await order.save();
  res.status(201).send(order);
}

async function getOrder(req, res) {
  const { id } = req.params;
  // when customer is deleted, populate('customer') will find there is no customer object
  const order = await orderModel.findById(id).populate("pizza");
  if (!order) {
    return res.status(404).send("Order not found");
  }
  console.log(order);
  return res.send(order);
}

async function getAllOrders(req, res) {
  const orders = await orderModel.find().exec();
  return res.send(orders);
}

async function updateOrder(req, res) {
  const { id } = req.params;
  const {
    quantity,
    price,
    note,
    paymentMethod,
    orderTime,
    orderStatus,
  } = req.body;
  const updatedOrder = await orderModel.findByIdAndUpdate(
    id,
    { quantity, price, note, paymentMethod, orderTime, orderStatus },
    { new: true }
  );
  if (!updatedOrder) {
    return res.status(404).send("Order not found");
  }
  return res.send(updatedOrder);
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const deletedOrder = await orderModel.findByIdAndDelete(id);
  if (!deletedOrder) {
    return res.status(404).send("Order not found");
  }
  return res.sendStatus(200);
}

async function addPizza(req, res) {
  const { orderId, pizzaId } = req.params;
  const order = await orderModel.findById(orderId);
  const pizza = await pizzaModel.findById(pizzaId);
  if (!order || !pizza) {
    return res.status(404).send("Order or Pizza not found");
  }
  order.pizza.addToSet(pizzaId);
  pizza.orders.addToSet(orderId);
  Promise.all([await order.save()], [await pizza.save()]);
  return res.send(order);
}

function deletePizza(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addPizza,
  deletePizza,
};
