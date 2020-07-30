const { paidOrderModel, validate } = require("../models/paidOrder");

async function updateOrderStatus(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { status } = req.body;
  const order = await paidOrderModel.findByIdAndUpdate(
    req.params.id,
    {
      status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(404).json("Order is not found");
  }

  return res.json(order);
}

async function getOrder(req, res) {
  const order = await paidOrderModel.findById(req.params.id);
  if (!order) {
    return res
      .status(404)
      .send("The Order is not found, Please Check Your Order ID");
  }

  return res.json(order);
}

async function getAllOrders(req, res) {
  const orders = await paidOrderModel.find();
  res.json(orders);
}

async function deleteOrders(req, res) {
  const order = await paidOrderModel.findByIdAndDelete(req.params.id);
  return res.json(order);
}

module.exports = {
  updateOrderStatus,
  getOrder,
  getAllOrders,
  deleteOrders,
};
