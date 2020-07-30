const express = require("express");
const router = express.Router();
const {
  getAllDessertGenres,
  addDessertGenre,
  updateDessertGenre,
  deleteDessertGenre,
  addDessert,
  deleteDessert,
} = require("../controllers/dessertGenres");

router.get("/", getAllDessertGenres);
router.post("/", addDessertGenre);
router.put("/:id", updateDessertGenre);
router.delete("/:id", deleteDessertGenre);
router.post("/:id/dessert/:dessertId", addDessert);
router.delete("/:id/dessert/:dessertId", deleteDessert);

module.exports = router;
