const { listActiveProducts } = require("../services/products.service");

const listProductsHandler = async (req, res) => {
  try {
    const products = await listActiveProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.error("List products error:", err);
    return res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};
const listProductBySlugHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await listActiveProducts();
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error("List product by slug error:", err);
    return res.status(500).json({
      error: "Failed to fetch product",
    });
  }
};

module.exports = {
  listProductsHandler,
  listProductBySlugHandler,
};
