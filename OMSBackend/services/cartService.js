const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.getCartByUser = async (userId) => {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return null;
    
    const items = await CartItem.find({ cart_id: cart._id }).populate('product_id');
    return { cart, items };
};

exports.createCart = async (userId) => {
    const cart = new Cart({ user_id: userId });
    return await cart.save();
};

exports.addItemToCart = async (cartId, itemData) => {
    const cartItem = new CartItem({
        cart_id: cartId,
        product_id: itemData.product_id,
        quantity: itemData.quantity
    });
    return await cartItem.save();
};

exports.removeItemFromCart = async (cartItemId) => {
    return await CartItem.findByIdAndDelete(cartItemId);
};

exports.checkout = async (cartId, orderDetails) => {
    const Order = require('../models/Order');
    const OrderItem = require('../models/OrderItem');
    const cartItems = await CartItem.find({ cart_id: cartId }).populate('product_id');
    
    const total_price = cartItems.reduce((total, item) => total + (item.product_id.price * item.quantity), 0);
    const order = new Order({ ...orderDetails, user_id: orderDetails.user_id, total_price });
    const savedOrder = await order.save();
    
    if (cartItems.length > 0) {
        const orderItems = cartItems.map(item => ({
            order_id: savedOrder._id,
            product_id: item.product_id._id,
            quantity: item.quantity,
            unit_price: item.product_id.price
        }));
        await OrderItem.insertMany(orderItems);
    }
    
    // Clear cart
    await CartItem.deleteMany({ cart_id: cartId });
    return savedOrder;
};
