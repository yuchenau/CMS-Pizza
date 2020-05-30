const mongoose = require('mongoose');
const schema = mongoose.Schema({
    customer:{
        type:String,
        ref:'Customer',
    },
    Quantity:{
        type:Number,
    },
    price:{
        type:Number,
    },
    note:{
        type:String,
    },
    paymentMethod:{
        type:String,
    },
    orderTime:{
        type:String,
    },
    orderStatus:{
        type:String,
    }
})

const Model = mongoose.model('Order', schema);
module.exports = Model;