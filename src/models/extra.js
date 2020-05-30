const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:String,
    },
});

const Model = mongoose.model('Extra', schema);
module.exports = Model;