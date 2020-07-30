const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quantity: { type: String, default: 1 },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  totalPrice: { type: Number, required: true },
});

const Model = mongoose.model("Order", schema);

exports.orderSchema = schema;
exports.orderModel = Model;
