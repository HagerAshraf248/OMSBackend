const userService = require('../services/userService');
const authService = require('../services/authService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const supplierData = { ...req.body, role: 'supplier' };
        const user = await authService.register(supplierData);
        res.status(201).json({ message: 'Supplier added successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
