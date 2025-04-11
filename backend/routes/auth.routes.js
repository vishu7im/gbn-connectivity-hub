
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user
router.get('/me', verifyToken, authController.getCurrentUser);

// Get pending users (admin only)
router.get('/pending', verifyToken, verifyAdmin, authController.getPendingUsers);

// Update user profile
router.put('/profile', verifyToken, authController.updateProfile);

// Update password
router.put('/password', verifyToken, authController.updatePassword);

module.exports = router;
