const express = require("express");
const router = express.Router();
const {
  getPizzaGenre,
  getAllPizzaGenre,
  addPizzaGenre,
  updatePizzaGenre,
  deletePizzaGenre,
  addPizza,
  deletePizza,
} = require("../controllers/pizzaGenres");

router.get("/", getAllPizzaGenre);
router.get("/:id", getPizzaGenre);
router.post("/", addPizzaGenre);
router.put("/:id", updatePizzaGenre);
router.delete("/:id", deletePizzaGenre);
router.post("/:id/pizza/:pizzaId", addPizza);
router.delete("/:id/pizza/:pizzaId", deletePizza);

module.exports = router;
