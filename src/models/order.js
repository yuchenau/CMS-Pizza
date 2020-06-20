const mongoose = require("mongoose");
const schema = mongoose.Schema({
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  pizza: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
  }],
});

const Model = mongoose.model("Order", schema);
module.exports = Model;
