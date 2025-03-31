
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/gallery');
  },
  filename: function (req, file, cb) {
    cb(null, `gallery-${Date.now()}${path.extname(file.originalname)}`);
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

// Get all gallery images
router.get('/', galleryController.getAllImages);

// Upload a new image (admin only)
router.post('/', verifyToken, upload.single('image'), galleryController.uploadImage);

// Delete an image (admin only)
router.delete('/:id', verifyToken, galleryController.deleteImage);

module.exports = router;
