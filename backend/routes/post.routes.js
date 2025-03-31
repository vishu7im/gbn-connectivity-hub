
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post
router.get('/:id', postController.getPostById);

// Get posts by user
router.get('/user/:userId', postController.getPostsByUser);

// Create a new post
router.post('/', verifyToken, postController.createPost);

// Like a post
router.post('/:id/like', verifyToken, postController.likePost);

// Add a comment to a post
router.post('/:id/comment', verifyToken, postController.addComment);

// Get comments for a post
router.get('/:id/comments', postController.getComments);

module.exports = router;
