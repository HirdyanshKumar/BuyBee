const prisma = require("../config/connectdb");



const createOrder = async (userId, items) => {
  
  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      is_active: true,
    },
  });

  if (products.length !== items.length) {
    const error = new Error("One or more products are invalid or inactive");
    error.statusCode = 404;
    throw error;
  }

  // Map productId → product
  const productMap = {};
  for (const product of products) {
    productMap[product.id] = product;
  }

  // Build order items + total
  let totalAmount = 0;

  const orderItemsData = items.map((item) => {
    const product = productMap[item.productId];

    const itemTotal = Number(product.price) * item.quantity;
    totalAmount += itemTotal;

    return {
      productId: product.id,
      product_name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  // Transaction: create order + items
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        status: "PENDING",
        total_amount: totalAmount,
      },
    });

    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        ...item,
        orderId: createdOrder.id,
      })),
    });

    return createdOrder;
  });

  return {
    orderId: order.id,
    status: order.status,
    totalAmount: order.total_amount,
    items: orderItemsData.map((item) => ({
      productName: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  };
};
const listUserOrders = async (userId) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      status: true,
      total_amount: true,
      created_at: true,
    },
  });

  return orders.map((order) => ({
    orderId: order.id,
    status: order.status,
    totalAmount: order.total_amount,
    createdAt: order.created_at,
  }));
};

module.exports = {
  createOrder,
  listUserOrders,
};
