const { dessertGenreModel, validate } = require("../models/dessertGenre");
const { productModel } = require("../models/product");

async function getAllDessertGenres(req, res) {
  const dessertGenres = await dessertGenreModel.find().populate("desserts");
  res.json(dessertGenres);
}

async function addDessertGenre(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const newDessertGenre = new dessertGenreModel({
    name,
  });
  const result = await newDessertGenre.save();
  res.json(result);
}

async function updateDessertGenre(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const dessertGenre = await dessertGenreModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );

  if (!dessertGenre) {
    return res.status(404).json("this genre is not found");
  }

  return res.json(dessertGenre);
}

async function deleteDessertGenre(req, res) {
  const dessertGenre = await dessertGenreModel.findByIdAndDelete(req.params.id);
  if (!dessertGenre) return res.status(404).json("This Genre is not found");
  return res.json(dessertGenre);
}

async function addDessert(req, res) {
  const { id, dessertId } = req.params;
  const dessertGenre = await dessertGenreModel.findById(id);
  const dessert = await productModel.findById(dessertId);
  if (!dessert || !dessertGenre) {
    return res.status(404).json("dessert or dessert genre not found");
  }
  dessertGenre.desserts.addToSet(dessert._id);
  await dessertGenre.save();
  return res.json(dessertGenre);
}

async function deleteDessert(req, res) {
  const { id, dessertId } = req.params;
  const dessertGenre = await dessertGenreModel.findById(id);
  const dessert = await ingredientModel.findById(dessertId);
  if (!dessert || !dessertGenre) {
    return res.status(404).json("dessert or dessert genre not found");
  }
  dessertGenre.desserts.pull(dessert._id);
  await dessertGenre.save();
  return res.json(dessertGenre);
}

module.exports = {
  getAllDessertGenres,
  addDessertGenre,
  updateDessertGenre,
  deleteDessertGenre,
  addDessert,
  deleteDessert,
};
