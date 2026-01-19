const express = require("express");
const { verifyAuth } = require("../../middlewares/auth.middleware");
const { requireAdmin } = require("../../middlewares/admin.middleware");
const {listAllOrdersHandler,updateOrderStatusHandler,} = require("../../controllers/admin/order.controller");

const router = express.Router();

router.get("/", verifyAuth, requireAdmin, listAllOrdersHandler);
router.put("/:orderId/status", verifyAuth, requireAdmin, updateOrderStatusHandler);

module.exports = router;
