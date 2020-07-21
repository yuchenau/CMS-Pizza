const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drinks: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]

})

const Model = mongoose.model('DrinkGenre', schema)

function validate(drinkGenre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    return schema.validate(drinkGenre);
}

exports.drinkGenreModel = Model
exports.validate = validate