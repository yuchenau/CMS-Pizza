const express = require("express");

const customerRoutes = require("./routes/customers");

const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const pizzaRoutes = require("./routes/pizza");
const productRoutes = require("./routes/products");
const cartRoutes = require('./routes/cart');
const paidOrderRoutes = require('./routes/paidOrder');

const pizzaGenreRoutes = require("./routes/pizzaGenres");
const sideGenreRoutes = require("./routes/sideGenres");
const dessertGenreRoutes = require("./routes/dessertGenres");
const drinkGenreRoutes = require("./routes/drinkGenres");

const authenticationRoutes = require("./routes/authentication");
const customerAuthRoutes = require("./routes/customerAuth");
const authenticationGuard = require("./middleware/authGuard");

const stripCheckoutRoutes = require('./routes/stripe');

const router = express.Router();

router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/pizzas", pizzaRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/paidOrder", paidOrderRoutes);

router.use("/checkout", stripCheckoutRoutes);

router.use("/pizzaGenres", pizzaGenreRoutes);
router.use("/sideGenres", sideGenreRoutes);
router.use("/dessertGenres", dessertGenreRoutes);
router.use("/drinkGenres", drinkGenreRoutes);

router.use("/authentication", authenticationRoutes);
router.use("/customerAuth", customerAuthRoutes);


module.exports = router;
