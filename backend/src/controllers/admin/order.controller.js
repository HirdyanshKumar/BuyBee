const { listAllOrders } = require("../../services/order.service");

const listAllOrdersHandler = async (req, res) => {
  try {
    const orders = await listAllOrders();
    return res.status(200).json(orders);
  } catch (err) {
    console.error("Admin list orders error:", err);
    return res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
};
const updateOrderStatusHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = updateOrderStatusSchema.parse(req.body);

    const updated = await updateOrderStatus(orderId, status);

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updated,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    console.error("Update order status error:", err);
    return res.status(500).json({
      error: "Failed to update order status",
    });
  }
};

module.exports = {
  listAllOrdersHandler,
  updateOrderStatusHandler,
};
