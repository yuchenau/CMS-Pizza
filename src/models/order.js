const mongoose = require('mongoose');
const schema = mongoose.Schema({
    // 1 to 1: {}
    // 1 to many: [{},{}]
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
    },
    quantity:{
        type:String,
    },
    price:{
        type:String,
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