const mongoose = require("mongoose");
const Joi = require("joi");
const { orderSchema } = require("./order");

const schema = new mongoose.Schema({
  orders: [],
  shippingAddress: {
    type: String,
  },
  status: { type: String, default: "Confirmed" },
  time: { type: Date, default: Date.now },
  name: { type: String },
});

const Model = mongoose.model("PaidOrder", schema);

function validateStatus(status) {
  const schema = Joi.object({
    status: Joi.string()
      .valid("Confirmed", "Prepared", "Deliverd", "Completed")
      .required(),
  });
  return schema.validate(status);
}

exports.paidOrderModel = Model;
exports.validate = validateStatus;
