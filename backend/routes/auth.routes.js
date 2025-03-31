
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get pending users for approval
router.get('/pending', verifyToken, authController.getPendingUsers);

// Verify user by admin
router.put('/verify/:userId', verifyToken, authController.verifyUser);

module.exports = router;
