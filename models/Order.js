const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_date: { type: Date, default: Date.now },
    total_price: { type: Number, required: true },
    client_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
