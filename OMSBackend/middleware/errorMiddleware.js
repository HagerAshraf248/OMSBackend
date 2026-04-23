const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose bad object ID
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Resource not found' });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(400).json({ message: 'invalid data' });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({ message });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        message: err.message || 'Server Error'
    });
};

module.exports = errorHandler;
