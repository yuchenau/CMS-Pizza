const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

const router = express.Router();

router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);
router.get("/:id", getOrder);
router.get("/", getAllOrders);

module.exports = router;
