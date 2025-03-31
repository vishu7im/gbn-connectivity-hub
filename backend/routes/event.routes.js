
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/events');
  },
  filename: function (req, file, cb) {
    cb(null, `event-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image file.'), false);
    }
  }
});

// Get all events
router.get('/', eventController.getAllEvents);

// Get a single event
router.get('/:id', eventController.getEventById);

// Create an event (admin only)
router.post('/', verifyToken, upload.single('image'), eventController.createEvent);

// Update an event (admin only)
router.put('/:id', verifyToken, upload.single('image'), eventController.updateEvent);

// Delete an event (admin only)
router.delete('/:id', verifyToken, eventController.deleteEvent);

module.exports = router;
