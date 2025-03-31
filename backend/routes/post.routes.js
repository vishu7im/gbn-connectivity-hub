
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { verifyToken, verifyUserStatus } = require('../middleware/auth.middleware');

// Get all posts (with infinite scrolling)
router.get('/', postController.getAllPosts);

// Get a post by ID
router.get('/:id', postController.getPostById);

// Get posts by user
router.get('/user/:userId', postController.getPostsByUser);

// Create a new post (requires verified status)
router.post('/', verifyToken, verifyUserStatus, postController.createPost);

// Like a post
router.post('/:id/like', verifyToken, postController.likePost);

// Unlike a post
router.delete('/:id/like', verifyToken, postController.unlikePost);

// Add a comment to a post (requires verified status)
router.post('/:id/comments', verifyToken, verifyUserStatus, postController.addComment);

// Get comments for a post
router.get('/:id/comments', postController.getComments);

// Delete a post
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;
