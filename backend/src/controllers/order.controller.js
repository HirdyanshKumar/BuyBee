const { createOrderSchema,updateOrderStatusSchema } = require("../validations/order.validation");
const { createOrder,listUserOrders,getOrderDetails,updateOrderStatus } = require("../services/order.service");

const createOrderHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const validatedData = createOrderSchema.parse(req.body);

    const order = await createOrder(userId, validatedData.items);

    return res.status(201).json(order);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: err.errors[0].message,
      });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    console.error("Create order error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
const listUserOrdersHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await listUserOrders(userId);

    return res.status(200).json(orders);
  } catch (err) {
    console.error("List user orders error:", err);
    return res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
};
const getOrderDetailsHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    const requester = req.user; 

    const order = await getOrderDetails(orderId, requester);

    return res.status(200).json(order);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    console.error("Get order details error:", err);
    return res.status(500).json({
      error: "Failed to fetch order details",
    });
  }
};

module.exports = {
  createOrderHandler,
  listUserOrdersHandler,
  getOrderDetailsHandler,
};
