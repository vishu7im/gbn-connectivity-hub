
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user
router.get('/:id', userController.getUserById);

// Get current user profile
router.get('/profile/me', verifyToken, userController.getMyProfile);

// Update user profile
router.put('/profile', verifyToken, userController.updateProfile);

// Admin: Verify a user
router.put('/:id/verify', verifyToken, userController.verifyUser);

module.exports = router;
