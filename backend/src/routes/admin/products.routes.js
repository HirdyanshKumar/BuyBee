const express = require('express');
const { requireAdmin } = require('../../middlewares/admin.middleware');
const { verifyAuth } = require('../../middlewares/auth.middleware');
const { createProductController,updateProductController,deleteProductController } = require('../../controllers/admin/products.controller');
const router = express.Router();

router.post('/', verifyAuth, requireAdmin, createProductController);
router.put('/:productId', verifyAuth, requireAdmin, updateProductController);
router.delete('/:productId', verifyAuth, requireAdmin, deleteProductController);

module.exports = router;