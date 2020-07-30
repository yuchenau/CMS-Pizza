const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Model = mongoose.model("PizzaGenre", schema);

function validate(pizzaGenre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(pizzaGenre);
}

exports.pizzaGenreModel = Model;
exports.validate = validate;
