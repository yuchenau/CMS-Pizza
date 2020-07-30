const OrderModel = require("../models/order");
const PizzaModel = require("../models/pizza");

async function addPizza(req, res) {
  const { name, price, ingredients, description } = req.body;
  const pizza = new PizzaModel({ name, price, ingredients, description });
  await pizza.save();
  return res.status(201).send(pizza);
}

async function getPizza(req, res) {
  const { id } = req.params;
  const pizza = await PizzaModel.findById(id);
  if (!pizza) {
    return res.status(404).send("pizza not found");
  }
  return res.send(pizza);
}

async function getAllPizza(req, res) {
  const pizza = await PizzaModel.find().exec();
  res.send(pizza);
}

async function updatePizza(req, res) {
  const { id } = req.params;
  const { name, price, ingredients, description } = req.body;
  const newPizza = PizzaModel.findByIdAndUpdate(
    id,
    { name, price, ingredients, description },
    { new: true }
  );
  if (!newPizza) {
    return res.status(404).send("pizza not found");
  }
  return res.send(newPizza);
}

function deletePizza() {
  const { id } = req.params;
  const deletedPizza = PizzaModel.findByIdAndDelete(id);
  if (!deletedPizza) {
    return res.status(404).send("pizza not found");
  }
  return res.sendStatus(200);
}

module.exports = {
  addPizza,
  getPizza,
  getAllPizza,
  updatePizza,
  deletePizza,
};
