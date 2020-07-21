const {sideGenreModel, validate } = require('../models/sideGenre');
const { productModel } = require('../models/product');

async function getAllSideGenres(req,res) {
    const sideGenres = await sideGenreModel.find().populate('sides')
    res.json(sideGenres)
}


async function addSideGenre(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name} = req.body
    const newSideGenre = new sideGenreModel({
        name
    })
    const result = await newSideGenre.save()
    res.json(result)
}

async function updateSideGenre(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const sideGenre = await sideGenreModel.findByIdAndUpdate(req.params.id, {
        name
    },{new: true});

    if (!sideGenre) {
        return res.status(404).json("this genre is not found")
    };

    return res.json(sideGenre);
}

async function deleteSideGenre(req,res) {
    const sideGenre = await sideGenreModel.findByIdAndDelete(req.params.id)
    if(!sideGenre) return res.status(404).json('This Genre is not found');
    return res.json(sideGenre)
}

async function addSide(req, res) {
    const { id, sideId } = req.params
    const sideGenre = await sideGenreModel.findById(id);
    const side = await productModel.findById(sideId);
    if (!side || !sideGenre ) {
        return res.status(404).json('side or side genre not found');
    }
    sideGenre.sides.addToSet(side._id)
    await sideGenre.save();
    return res.json(sideGenre)
}

async function deleteSide(req, res) {
    const { id, sideId } = req.params
    const sideGenre = await sideGenreModel.findById(id);
    const side = await ingredientModel.findById(sideId);
    if (!side || !sideGenre ) {
        return res.status(404).json('side or side genre not found');
    }
    sideGenre.sides.pull(side._id);
    await sideGenre.save();
    return res.json(sideGenre)
}


module.exports = {
    getAllSideGenres,
    addSideGenre,
    updateSideGenre,
    deleteSideGenre,
    addSide,
    deleteSide
}