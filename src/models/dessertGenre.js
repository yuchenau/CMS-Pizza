const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desserts: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]

})

const Model = mongoose.model('DessertGenre', schema)

function validate(dessertGenre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    return schema.validate(dessertGenre);
}


exports.dessertGenreModel = Model
exports.validate = validate