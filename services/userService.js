const User = require('../models/User');

exports.getAllUsers = async () => {
    return await User.find();
};

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
