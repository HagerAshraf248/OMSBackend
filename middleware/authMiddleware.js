const jwtUtils = require('../utils/jwt');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied: Please log in first' });

    try {
        const verified = jwtUtils.verifyToken(token.replace('Bearer ', ''));
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admin only' });
    }
    next();
};

exports.isSupplier = (req, res, next) => {
    if (req.user.role !== 'supplier' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Supplier only' });
    }
    next();
};
