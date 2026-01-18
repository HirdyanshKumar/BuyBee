const express = require('express')

const router = express.Router()
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminProductRoutes = require("./admin/products.routes");
const productRoutes = require("./products.routes");



router.use("/auth",authRoutes);
router.use("/users", userRoutes);
router.use("/admin/products", adminProductRoutes);
router.use("/products", productRoutes);

module.exports = router;