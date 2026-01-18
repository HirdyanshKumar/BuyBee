const prisma = require("../config/connectdb");

const listActiveProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      stock: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return products;
};

module.exports = {
  listActiveProducts,
};  

