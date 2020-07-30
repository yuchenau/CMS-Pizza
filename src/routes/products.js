const express = require("express");
const router = express.Router();
const {
  getProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateAvatar,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id/avatar", updateAvatar);

module.exports = router;
