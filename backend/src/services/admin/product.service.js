const prisma = require("../../config/connectdb");


const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const createProduct = async ({
  name,
  description,
  price,
  stock,
  categoryId,
}) => {
  // Check category exists
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const slug = generateSlug(name);

 
  const existingProduct = await prisma.product.findUnique({
    where: { slug },
  });

  if (existingProduct) {
    const error = new Error("Product with same name already exists");
    error.statusCode = 409;
    throw error;
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
      categoryId,
      is_active: true,
    },
  });

  return product;
};
const updateProduct = async (productId, updateData) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  if (updateData.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: updateData.categoryId },
    });

    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
  }
  if (updateData.name) {
    const newSlug = generateSlug(updateData.name);

    const slugConflict = await prisma.product.findFirst({
      where: {
        slug: newSlug,
        NOT: { id: productId },
      },
    });

    if (slugConflict) {
      const error = new Error("Another product with this name already exists");
      error.statusCode = 409;
      throw error;
    }

    updateData.slug = newSlug;
  }

    const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name: updateData.name,
      slug: updateData.slug,
      description: updateData.description,
      price: updateData.price,
      stock: updateData.stock,
      is_active: updateData.isActive,
      categoryId: updateData.categoryId,
    },
  });

  return updatedProduct;
  }

const softDeleteProduct = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  
  if (!product.is_active) {
    return product;
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      is_active: false,
    },
  });

  return updatedProduct;
};


module.exports = {
  createProduct,
  updateProduct,
  softDeleteProduct,
};
