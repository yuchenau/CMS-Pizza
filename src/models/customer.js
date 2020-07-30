const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  userCart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  trackMyOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "PaidOrder" }],
});

schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
  try {
    const validatePassword = await bcrypt.compare(password, this.password);
    return validatePassword;
  } catch (e) {
    return res.status(400).send("Invalid email or password.");
  }
};

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required(),
    address: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(customer);
}

const Model = mongoose.model("Customer", schema);

exports.customerModel = Model;
exports.validate = validateCustomer;
