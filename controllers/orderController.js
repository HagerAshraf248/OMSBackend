const orderService = require('../services/orderService');

exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.params.userId);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const savedOrder = await orderService.createOrder(req.body);
        res.status(201).json({ message: 'Order created successfully', orderId: savedOrder._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
