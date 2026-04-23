const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).pattern(/^[a-zA-Z]+$/).required().messages({
        'string.pattern.base': 'invalid data',
        'string.min': 'invalid data',
        'string.max': 'invalid data',
        'any.required': 'invalid data',
        'string.empty': 'invalid data'
    }),
    lastName: Joi.string().min(2).max(20).pattern(/^[a-zA-Z]+$/).required().messages({
        'string.pattern.base': 'invalid data',
        'string.min': 'invalid data',
        'string.max': 'invalid data',
        'any.required': 'invalid data',
        'string.empty': 'invalid data'
    }),
    email: Joi.string().pattern(/^\S+@\S+\.\S+$/).required().messages({
        'string.pattern.base': 'invalid data',
        'any.required': 'invalid data',
        'string.empty': 'invalid data'
    }),
    password: Joi.string().pattern(/^(?=.*[A-Z]).{8,}$/).required().messages({
        'string.pattern.base': 'invalid data',
        'any.required': 'invalid data',
        'string.empty': 'invalid data'
    }),
    role: Joi.string().valid('client', 'supplier', 'admin').optional(),
    phone_number: Joi.string().optional()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

exports.validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'invalid data' });
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'invalid mail or password' });
    }
    next();
};
