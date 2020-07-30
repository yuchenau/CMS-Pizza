const express = require("express");
const router = express.Router();
const { loginCustomer } = require("../controllers/customerAuth");

router.post("/", loginCustomer);

module.exports = router;
