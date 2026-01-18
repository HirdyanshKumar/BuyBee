const express = require("express");
const {
  listProductsHandler,
    listProductBySlugHandler,
} = require("../controllers/products.controller");

const router = express.Router();


router.get("/", listProductsHandler);
router.get('/:slug',listProductBySlugHandler);

module.exports = router;
