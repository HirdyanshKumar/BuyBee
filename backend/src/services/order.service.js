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

const getOrderDetails = async(orderId,requester)=>{
    const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        select: {
          product_name: true,
          price: true,
          quantity: true,
        },
      },
    },
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  if (requester.role !== "ADMIN" && order.userId !== requester.id) {
    const error = new Error("Access denied");
    error.statusCode = 403;
    throw error;
  }
  return {
    orderId: order.id,
    status: order.status,
    totalAmount: order.total_amount,
    createdAt: order.created_at,
    items: order.items.map((i) => ({
      productName: i.product_name,
      price: i.price,
      quantity: i.quantity,
    })),
  };
};

const listAllOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      userId: true,
      status: true,
      total_amount: true,
      created_at: true,
    },
  });

  return orders.map((o) => ({
    orderId: o.id,
    userId: o.userId,
    status: o.status,
    totalAmount: o.total_amount,
    createdAt: o.created_at,
  }));
};

const updateOrderStatus = async (orderId, status) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
    },
  });

  return {
    orderId: updatedOrder.id,
    status: updatedOrder.status,
    updatedAt: updatedOrder.created_at,
  };
};
module.exports = {
  createOrder,
  listUserOrders,
  getOrderDetails,
  listAllOrders,
  updateOrderStatus,
};
