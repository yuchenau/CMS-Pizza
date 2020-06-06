const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    vegetarian:{
        type:Boolean,
    },
    calorie:{
        type:Number,
    },
    ingredients:[{
        type:String,
        ref:'Ingredient',
    }],
    extras:[{
        type:String,
        ref:'Extra',
    }],
})

const Model = mongoose.model('Pizza', schema);
module.exports = Model;