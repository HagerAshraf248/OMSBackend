const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'Registration successful. Please log in.', user });
    } catch (err) {
        if (err.name === 'ValidationError' || err.code === 11000) {
            return res.status(400).json({ message: 'invalid data' });
        }
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', ...result });
    } catch (err) {
        res.status(401).json({ message: 'invalid mail or password' });
    }
};
