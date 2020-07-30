const express = require("express");
const router = express.Router();

const { getStripe, addStripe } = require("../controllers/stripeCheckout");

router.post("/", addStripe);
router.get("/", getStripe);

module.exports = router;
