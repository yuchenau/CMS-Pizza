const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addPizza,
  deletePizza
} = require("../controllers/orders");

const router = express.Router();

router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);
router.get("/:id", getOrder);
router.get("/", getAllOrders);
router.post("/:orderId/pizza/:pizzaId", addPizza);
router.delete("/:orderId/pizza/:pizzaId"), deletePizza;

module.exports = router;
