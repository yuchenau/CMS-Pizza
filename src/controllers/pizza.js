const OrderModel = require('../models/order');
const PizzaModel = require('../models/pizza');

async function addPizza(req, res) {
    const { name, description, vegetarian, calorie } = req.body;
    const pizza = new PizzaModel({ name, description, vegetarian, calorie });
    await pizza.save();
    return res.status(201).send(pizza);
}

async function getPizza(req, res) {
    const { id } = req.params;
    const pizza = await PizzaModel.findById(id);
    if (!pizza) {
        return res.status(404).send('pizza not found');
    }
    return res.send(pizza);
}

async function getAllPizza(req, res) {
    const pizza = await PizzaModel.find().exec();
    res.send(pizza);
}

async function updatePizza(req, res) {
    const { id } = req.params;
    const { name, description, vegetarian, calorie } = req.body;
    const newPizza = PizzaModel.findByIdAndUpdate(id, {name , description, vegetarian, calorie}, {new: true});
    if(!newPizza) {
        return res.status(404).send('pizza not found');
    }
    return res.send(newPizza);
}

function deletePizza() {
    const { id } = req.params;
    const deletedPizza = PizzaModel.findByIdAndDelete(id);
    if(!deletedPizza) {
        return res.status(404).send('pizza not found');
    }
    return res.sendStatus(200);
}

module.exports = {
    addPizza,
    getPizza,
    getAllPizza,
    updatePizza,
    deletePizza
}