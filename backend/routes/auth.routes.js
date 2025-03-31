
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get pending users for approval
router.get('/pending', verifyToken, verifyAdmin, authController.getPendingUsers);

// Verify user by admin
router.put('/verify/:userId', verifyToken, verifyAdmin, authController.verifyUser);

module.exports = router;
