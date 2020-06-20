const express = require("express");
const {
  addPizza,
  getPizza,
  getAllPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza");

const router = express.Router();

router.post("/", addPizza);
router.delete("/:id", deletePizza);
router.put("/:id", updatePizza);
router.get("/:id", getPizza);
router.get("/", getAllPizza);

module.exports = router;
