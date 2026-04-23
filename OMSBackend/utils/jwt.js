const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    // secret123 if JWT_SECRET is missing for safety
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '1d'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret123');
};

module.exports = {
    generateToken,
    verifyToken
};
