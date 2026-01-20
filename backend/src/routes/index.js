const express = require('express')

const router = express.Router()
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminProductRoutes = require("./admin/products.routes");
const productRoutes = require("./products.routes");
const ordersRoutes = require("./order.routes");
const adminOrdersRoutes = require("./admin/order.routes");
const { errorHandler } = require("../middlewares/error.middleware");


router.use("/auth",authRoutes);
router.use("/users", userRoutes);
router.use("/admin/products", adminProductRoutes);
router.use("/products", productRoutes);
router.use("/orders", ordersRoutes);
router.use("/admin/orders", adminOrdersRoutes);



app.use(errorHandler)
module.exports = router;