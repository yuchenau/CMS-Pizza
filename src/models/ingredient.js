const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Model = mongoose.model("Ingredient", schema);
module.exports = Model;
