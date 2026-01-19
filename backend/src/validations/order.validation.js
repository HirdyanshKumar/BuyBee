const { z } = require("zod");

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid("Invalid product ID"),
        quantity: z.number().int().positive("Quantity must be > 0"),
      })
    )
    .min(1, "Order must contain at least one item"),
});
const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});
module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
