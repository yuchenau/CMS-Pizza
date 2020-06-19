const mongoose = require("mongoose");
const schema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
  },
  note: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  orderTime: {
    type: String,
  },
  orderStatus: {
    type: String,
  },
});

const Model = mongoose.model("Order", schema);
module.exports = Model;
