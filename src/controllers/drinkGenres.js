const { drinkGenreModel, validate } = require("../models/drinkGenre");
const { productModel } = require("../models/product");

async function getAllDrinkGenres(req, res) {
  const drinkGenres = await drinkGenreModel.find().populate("drinks");
  res.json(drinkGenres);
}

async function addDrinkGenre(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const newDrinkGenre = new drinkGenreModel({
    name,
  });
  const result = await newDrinkGenre.save();
  res.json(result);
}

async function updateDrinkGenre(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const drinkGenre = await drinkGenreModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );

  if (!drinkGenre) {
    return res.status(404).json("this genre is not found");
  }

  return res.json(drinkGenre);
}

async function deleteDrinkGenre(req, res) {
  const drinkGenre = await drinkGenreModel.findByIdAndDelete(req.params.id);
  if (!drinkGenre) return res.status(404).json("This Genre is not found");
  return res.json(drinkGenre);
}

async function addDrink(req, res) {
  const { id, drinkId } = req.params;
  const drinkGenre = await drinkGenreModel.findById(id);
  const drink = await productModel.findById(drinkId);
  if (!drink || !drinkGenre) {
    return res.status(404).json("drink or drink genre not found");
  }
  drinkGenre.drinks.addToSet(drink._id);
  await drinkGenre.save();
  return res.json(drinkGenre);
}

async function deleteDrink(req, res) {
  const { id, drinkId } = req.params;
  const drinkGenre = await drinkGenreModel.findById(id);
  const drink = await ingredientModel.findById(drinkId);
  if (!drink || !drinkGenre) {
    return res.status(404).json("drink or drink genre not found");
  }
  drinkGenre.drinks.pull(drink._id);
  await drinkGenre.save();
  return res.json(drinkGenre);
}

module.exports = {
  getAllDrinkGenres,
  addDrinkGenre,
  updateDrinkGenre,
  deleteDrinkGenre,
  addDrink,
  deleteDrink,
};
