// Import mongoose Customer Model
const customerModel = require("../models/customer");
const orderModel = require("../models/order");

async function addCustomer(req, res) {
  const { firstName, lastName } = req.body;
  // New a customer document
  const customer = new customerModel({
    firstName,
    lastName,
  });
  try {
    await customer.save();
  } catch (e) {
    return res.status(400).send(e.message);
  }
  res.status(201).send(customer);
}

async function getCustomer(req, res) {
  // Rename id to code (Redundant)
  const { id: code } = req.params;
  // populate() functions
  const customer = await customerModel
    .findById(code)
    .populate("orders")
    .populate("pizza");
  // If id not found
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  console.log(customer);
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
  const updatedCustomer = await customerModel.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { new: true }
  );
  if (!updatedCustomer) {
    return res.status(404).send("Customer not found");
  }
  return res.send(updatedCustomer);
}

async function deleteCustomer(req, res) {
  const { id } = req.params;
  const deletedCustomer = await customerModel.findByIdAndDelete(id);
  if (!deletedCustomer) {
    return res.status(404).send("Customer not found");
  }
  // await orderModel.updateMany(
  //   { _id: {$in: deleteCustomer.orders}},
  //   { $pull: {orders: order._id}},
  // )
  return res.sendStatus(200);
}

async function addOrder(req, res) {
  // get customer id & order id
  const { customerId, orderId } = req.params;
  // console.log( customerId, orderId );
  // find customer
  const customer = await customerModel.findById(customerId);
  // find order
  const order = await orderModel.findById(orderId);
  // check customer & order exist
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  if (!order) {
    return res.status(404).send("Order not found");
  }
  // add order to customer
  // console.log(order.customer);
  customer.orders.addToSet(order._id);
  order.customer = customerId;
  // save customer
  Promise.all([await customer.save()], [await order.save()]);
  // return order
  return res.send(customer);
}

async function deleteOrder(req, res) {
  const { customerId, orderId } = req.params;
  const customer = await customerModel.findById(customerId);
  const order = await orderModel.findById(orderId);
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  if (!order) {
    return res.status(404).send("Order not found");
  }
  console.log(order._id);
  // delete order from customer's orders
  customer.orders.pull(order._id);
  // delete customer from order's customer
  order.customer = null;
  Promise.all([await customer.save()], [await order.save()]);
  return res.send(customer);
}

module.exports = {
  addCustomer,
  getCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  addOrder,
  deleteOrder,
};
