require('dotenv').config();
const mongoose = require('mongoose');

// Import Models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for Seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Cart.deleteMany({});
        await CartItem.deleteMany({});
        await Order.deleteMany({});
        await OrderItem.deleteMany({});
        console.log('Old Data Cleared.');

        // 1. Create Users
        const user1 = new User({
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
            password: 'hashed123',
            email: 'admin@example.com',
            phone_number: '1234567890'
        });
        const user2 = new User({
            firstName: 'Jane',
            lastName: 'Smith',
            role: 'client',
            password: 'hashed456',
            email: 'customer@example.com',
            phone_number: '0987654321'
        });
        await user1.save();
        await user2.save();

        // 2. Create Products
        const product1 = new Product({
            user_id: user1._id,
            product_title: 'iPhone 15 Pro',
            description: 'Latest Apple smartphone',
            price: 999,
            image_url: 'https://example.com/iphone.jpg',
            stock_quantity: 50,
            stock_status: 'In Stock'
        });
        const product2 = new Product({
            user_id: user1._id,
            product_title: 'Samsung Galaxy S24 Ultra',
            description: 'Latest Samsung flagship',
            price: 1199,
            image_url: 'https://example.com/samsung.jpg',
            stock_quantity: 30,
            stock_status: 'In Stock'
        });
        await product1.save();
        await product2.save();

        // 3. Create a Cart for Customer
        const cart = new Cart({ user_id: user2._id });
        await cart.save();

        // 4. Add Cart Item
        const cartItem = new CartItem({
            cart_id: cart._id,
            product_id: product1._id,
            quantity: 2
        });
        await cartItem.save();

        // 5. Create an Order for Customer
        const order = new Order({
            user_id: user2._id,
            total_price: 1998,
            client_name: 'Jane Smith',
            phone_number: '0987654321',
            address: '123 Main St',
            city: 'New York'
        });
        await order.save();

        // 6. Add Order Item
        const orderItem = new OrderItem({
            order_id: order._id,
            product_id: product1._id,
            quantity: 2,
            unit_price: 999
        });
        await orderItem.save();

        console.log('Dummy Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

seedData();
