const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // _id:{
    //     type:String,
    // },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    nickname:{
        type:String,
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
    registerTime:{
        type:String,
    }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

schema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

const Model = mongoose.model('Customer', schema);
module.exports = Model;