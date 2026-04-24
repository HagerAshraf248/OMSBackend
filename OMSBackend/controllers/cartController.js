const cartService = require('../services/cartService');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.getCartByUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const cartData = await cartService.getCartByUser(req.params.userId);
        if (!cartData) return res.status(404).json({ message: 'Cart not found' });
        res.json(cartData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCart = async (req, res) => {
    try {
        const newCart = await cartService.createCart(req.body.user_id);
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addItemToCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        if (cart.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const newItem = await cartService.addItemToCart(req.params.cartId, req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findById(req.params.itemId).populate('cart_id');
        if (!cartItem) return res.status(404).json({ message: 'Item not found' });
        if (cartItem.cart_id.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        await cartService.removeItemFromCart(req.params.itemId);
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.checkout = async (req, res) => {
    try {
        // Assume req.body contains address, city, etc. and req.user.id
        const orderDetails = { ...req.body, user_id: req.user.id };
        const order = await cartService.checkout(req.params.cartId, orderDetails);
        res.status(201).json({ message: 'Checkout successful', order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
