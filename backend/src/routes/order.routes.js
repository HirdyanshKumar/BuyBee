const express = require("express");
const { verifyAuth } = require("../middlewares/auth.middleware");
const { createOrderHandler,listUserOrdersHandler,getOrderDetailsHandler } = require("../controllers/order.controller");

const router = express.Router();

router.post("/", verifyAuth, createOrderHandler);
router.get("/", verifyAuth, listUserOrdersHandler);
router.get("/:orderId", verifyAuth, getOrderDetailsHandler);


module.exports = router;
