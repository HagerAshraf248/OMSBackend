const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

// Get Cart for a user with its items
router.get('/user/:userId', verifyToken, cartController.getCartByUser);

// Create Cart
router.post('/', verifyToken, cartController.createCart);

// Add Item to Cart
router.post('/:cartId/items', verifyToken, cartController.addItemToCart);

// Remove Item from Cart
router.delete('/items/:itemId', verifyToken, cartController.removeItemFromCart);

// Checkout
router.post('/:cartId/checkout', verifyToken, cartController.checkout);

module.exports = router;
