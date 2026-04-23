const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// Get all orders for a user
router.get('/user/:userId', verifyToken, orderController.getOrdersByUser);

// Create an order
router.post('/', verifyToken, orderController.createOrder);

module.exports = router;
