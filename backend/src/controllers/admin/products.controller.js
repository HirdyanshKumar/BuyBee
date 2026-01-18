const { productschema,updateschema } = require("../../validations/product.validations");
const { createProduct,updateProduct,softDeleteProduct } = require("../../services/admin/product.service");

const createProductController = async (req, res) => {
  try {
    const validatedData = productschema.parse(req.body);

    const product = await createProduct(validatedData);

    return res.status(201).json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      isActive: product.is_active,
      categoryId: product.categoryId,
      createdAt: product.created_at,
    });
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

    console.error("Create product error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const validatedData = updateschema.parse(req.body);
    const productId = req.params.productId;

    const product = await updateProduct(productId, validatedData);

    return res.status(200).json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      isActive: product.is_active,
      categoryId: product.categoryId,
      createdAt: product.created_at,
    });
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

    console.error("Update product error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    await softDeleteProduct(productId);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    console.error("Delete product error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  deleteProductController,
};
