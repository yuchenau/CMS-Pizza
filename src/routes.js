const express = require("express");

const customerRoutes = require("./routes/customers");

const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const pizzaRoutes= require("./routes/pizza");

const authenticationRoutes = require("./routes/authentication");
const authenticationGuard = require("./middleware/authGuard");

const router = express.Router();

router.use("/customers", authenticationGuard, customerRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/pizza", pizzaRoutes);
router.use("/authentication", authenticationRoutes);

module.exports = router;
