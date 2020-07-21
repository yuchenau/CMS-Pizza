const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  price: {
    type: Number,
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
