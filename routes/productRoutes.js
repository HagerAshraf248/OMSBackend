const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isSupplier } = require('../middleware/authMiddleware');

// GET all products (Clients/Everyone)
router.get('/', productController.getAllProducts);

// POST new product (Supplier only)
router.post('/', verifyToken, isSupplier, productController.createProduct);

// DELETE product (Supplier only)
router.delete('/:id', verifyToken, isSupplier, productController.deleteProduct);

module.exports = router;
