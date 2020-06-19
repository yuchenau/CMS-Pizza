const express = require("express");
const {
  addCustomer,
  getCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  addOrder,
  deleteOrder,
} = require("../controllers/customers");

const router = express.Router();

router.post("/", addCustomer);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);
router.get("/:id", getCustomer);
router.get("/", getAllCustomer);
router.post("/:customerId/orders/:orderId", addOrder);
router.delete("/:customerId/orders/:orderId", deleteOrder);

module.exports = router;
