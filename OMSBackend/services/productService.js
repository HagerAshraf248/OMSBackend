const Product = require('../models/Product');

exports.getAllProducts = async () => {
    return await Product.find().populate('user_id', 'firstName lastName email');
};

exports.createProduct = async (productData, userId) => {
    const product = new Product({ ...productData, user_id: userId });
    return await product.save();
};

exports.deleteProduct = async (productId, userId) => {
    // Supplier can delete their own products
    return await Product.findOneAndDelete({ _id: productId, user_id: userId });
};
