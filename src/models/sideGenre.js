const mongoose = require('mongoose');
const Joi = require('joi')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sides: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ]

})

const Model = mongoose.model('SideGenre', schema)

function validate(sideGenre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    return schema.validate(sideGenre);
}


exports.sideGenreModel = Model
exports.validate = validate