
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// Get dashboard statistics (admin only)
router.get('/stats', verifyToken, verifyAdmin, adminController.getDashboardStats);

// Track site visit (public)
router.post('/track-visit', adminController.trackVisit);

module.exports = router;
