
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// Get dashboard statistics (admin only)
router.get('/stats', verifyToken, verifyAdmin, adminController.getDashboardStats);

// Track site visit (public)
router.post('/track-visit', adminController.trackVisit);

// Get pending user verifications (admin only)
router.get('/verifications', verifyToken, verifyAdmin, adminController.getPendingVerifications);

// Verify or reject a user (admin only)
router.put('/verify/:userId', verifyToken, verifyAdmin, adminController.verifyUser);

// Moderate a post (admin only)
router.put('/posts/:postId', verifyToken, verifyAdmin, adminController.moderatePost);

module.exports = router;
