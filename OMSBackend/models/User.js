const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true,
        minlength: [2, 'invalid data'],
        maxlength: [20, 'invalid data'],
        match: [/^[a-zA-Z]+$/, 'invalid data']
    },
    lastName: { 
        type: String, 
        required: true,
        minlength: [2, 'invalid data'],
        maxlength: [20, 'invalid data'],
        match: [/^[a-zA-Z]+$/, 'invalid data']
    },
    role: { 
        type: String, 
        required: true,
        enum: ['client', 'supplier', 'admin']
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'invalid data']
    },
    phone_number: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
