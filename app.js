require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
// Disable CSP in helmet so our simple index.html inline scripts can run
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Mobilestore API!' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});