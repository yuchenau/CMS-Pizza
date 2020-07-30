const {pizzaGenreModel, validate } = require('../models/pizzaGenre');
const { productModel } = require('../models/product');


async function getAllPizzaGenre(req,res) {
    const pizzaGenre = await pizzaGenreModel.find().populate('pizzas')
    res.json(pizzaGenre)
}

async function getPizzaGenre(req,res) {
    const pizzaGenre = await pizzaGenreModel.findById(req.params.id).populate('pizzas')
    if(!pizzaGenre) return res.status(404).json('The pizzaGenre is not found');
    return res.json(pizzaGenre)
}

async function addPizzaGenre(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name} = req.body
    const newPizzaGenre = new pizzaGenreModel({
        name
    })
    const result = await newPizzaGenre.save()
    res.json(result)
}

async function updatePizzaGenre(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const pizzaGenre = await pizzaGenreModel.findByIdAndUpdate(req.params.id, {
        name
    },{new: true});

    if (!pizzaGenre) {
        return res.status(404).json("The pizzaGenre is not found")
    };

    return res.json(pizzaGenre);
}

async function deletePizzaGenre(req,res) {
    const pizzaGenre = await pizzaGenreModel.findByIdAndDelete(req.params.id)
    if(!pizzaGenre) return res.status(404).json('The pizzaGenre  is not found');
    await pizzaGenreModel.updateMany(
        {_id:{$in: pizzaGenre.pizzas}},
    )
    return res.json(pizzaGenre)
}

async function addPizza(req, res) {
    const { id, pizzaId } = req.params
    const pizzaGenre = await pizzaGenreModel.findById(id);
    const pizza = await productModel.findById(pizzaId);
    if (!pizza || !pizzaGenre ) {
        return res.status(404).json('pizza or pizzaGenre not found');
    }
    pizzaGenre.pizzas.addToSet(pizza._id)
    await pizzaGenre.save();
    return res.json(pizzaGenre)
}

async function deletePizza(req, res) {
    const { id, pizzaId } = req.params
    const pizzaGenre = await pizzaGenreModel.findById(id);
    const pizza = await ingredientModel.findById(pizzaId);
    if (!pizza || !pizzaGenre ) {
        return res.status(404).json('pizza or ingredient not found');
    }
    pizzaGenre.pizzas.pull(pizza._id);
    await pizzaGenre.save();
    return res.json(pizzaGenre)
}

module.exports = {
    getPizzaGenre,
    getAllPizzaGenre,
    addPizzaGenre,
    updatePizzaGenre,
    deletePizzaGenre,
    addPizza,
    deletePizza
}