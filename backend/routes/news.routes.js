
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/news');
  },
  filename: function (req, file, cb) {
    cb(null, `news-${Date.now()}${path.extname(file.originalname)}`);
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

// Get all news
router.get('/', newsController.getAllNews);

// Get a single news item
router.get('/:id', newsController.getNewsById);

// Create a news item (admin only)
router.post('/', verifyToken, upload.single('image'), newsController.createNews);

// Update a news item (admin only)
router.put('/:id', verifyToken, upload.single('image'), newsController.updateNews);

// Delete a news item (admin only)
router.delete('/:id', verifyToken, newsController.deleteNews);

module.exports = router;
