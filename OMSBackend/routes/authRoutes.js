const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validations/authValidation');

// Registration endpoint
router.post('/register', validateRegister, authController.register);

// Login endpoint
router.post('/login', validateLogin, authController.login);

module.exports = router;
