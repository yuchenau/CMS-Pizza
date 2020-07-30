const mongoose = require("mongoose");
const Joi = require("joi");
const { orderSchema } = require("./order");

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: [orderSchema],
  totalPrice: { type: Number, default: 0 },
});

const Model = mongoose.model("Cart", schema);

// function validate(order) {
//     const schema = {
//         name: Joi.string().min(3).max(50).required()
//     }
//     return Joi.validate(order, schema);
// }

exports.cartModel = Model;
