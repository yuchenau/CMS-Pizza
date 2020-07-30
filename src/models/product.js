const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  price: {
    type: String,
    required: true,
  },
  ingredient: {
    type: String,
  },
  description: {
    type: String,
  },
  calorie: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  avatar: {
    type: String,
  },
});

const Model = mongoose.model("Product", schema);

function validate(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    calorie: Joi.string().required(),
    avatar: Joi.string().uri(),
  });
  return schema.validate(product);
}

exports.productModel = Model;
exports.validate = validate;
