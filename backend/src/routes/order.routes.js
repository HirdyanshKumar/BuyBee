const express = require("express");
const { verifyAuth } = require("../middlewares/auth.middleware");
const { createOrderHandler,listUserOrdersHandler } = require("../controllers/order.controller");

const router = express.Router();

router.post("/", verifyAuth, createOrderHandler);
router.get("/", verifyAuth, listUserOrdersHandler);
module.exports = router;
