const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image_url: { type: String },
    quantity: { type: Number },
    stock_quantity: { type: Number, required: true },
    stock_status: { type: String, required: true },
    product_status: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
