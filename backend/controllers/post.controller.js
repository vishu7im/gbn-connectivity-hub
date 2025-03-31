
const { pool } = require('../config/db.config');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT p.*, u.name as user_name, 
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error getting posts:', err);
    res.status(500).json({ message: 'Failed to get posts' });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [posts] = await pool.query(`
      SELECT p.*, u.name as user_name, 
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [id]);

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(posts[0]);
  } catch (err) {
    console.error('Error getting post:', err);
    res.status(500).json({ message: 'Failed to get post' });
  }
};

// Get posts by user
exports.getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [posts] = await pool.query(`
      SELECT p.*, u.name as user_name, 
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error getting user posts:', err);
    res.status(500).json({ message: 'Failed to get user posts' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)',
      [userId, content, image || null]
    );

    const [newPost] = await pool.query(`
      SELECT p.*, u.name as user_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost[0]
    });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if post exists
    const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already liked the post
    const [existingLikes] = await pool.query(
      'SELECT * FROM likes WHERE post_id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingLikes.length > 0) {
      // Unlike if already liked
      await pool.query(
        'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
        [id, userId]
      );
      
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      // Add like
      await pool.query(
        'INSERT INTO likes (post_id, user_id) VALUES (?, ?)',
        [id, userId]
      );
      
      res.status(201).json({ message: 'Post liked successfully' });
    }
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: 'Failed to like post' });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    // Check if post exists
    const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add comment
    const [result] = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [id, userId, content]
    );

    // Get the created comment with user info
    const [newComment] = await pool.query(`
      SELECT c.*, u.name as user_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment[0]
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if post exists
    const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Get comments
    const [comments] = await pool.query(`
      SELECT c.*, u.name as user_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [id]);

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error getting comments:', err);
    res.status(500).json({ message: 'Failed to get comments' });
  }
};
