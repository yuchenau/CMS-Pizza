const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  ingredients: {
    type: String,
  },
  description: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Model = mongoose.model("Pizza", schema);
module.exports = Model;
