const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.getOrdersByUser = async (userId) => {
    const orders = await Order.find({ user_id: userId });
    
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
        const items = await OrderItem.find({ order_id: order._id }).populate('product_id');
        return { order, items };
    }));

    return ordersWithItems;
};

exports.createOrder = async (orderData) => {
    const { items, ...orderDetails } = orderData;
    
    const order = new Order(orderDetails);
    const savedOrder = await order.save();

    if (items && items.length > 0) {
        const orderItems = items.map(item => ({
            order_id: savedOrder._id,
            ...item
        }));
        await OrderItem.insertMany(orderItems);
    }

    return savedOrder;
};
