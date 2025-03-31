
const { pool } = require('../config/db.config');
const fs = require('fs');
const path = require('path');

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const [news] = await pool.query(`
      SELECT n.*, u.name as author_name
      FROM news n
      JOIN users u ON n.user_id = u.id
      ORDER BY n.created_at DESC
    `);

    res.status(200).json(news);
  } catch (err) {
    console.error('Error getting news:', err);
    res.status(500).json({ message: 'Failed to get news' });
  }
};

// Get a single news item
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [news] = await pool.query(`
      SELECT n.*, u.name as author_name
      FROM news n
      JOIN users u ON n.user_id = u.id
      WHERE n.id = ?
    `, [id]);

    if (news.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.status(200).json(news[0]);
  } catch (err) {
    console.error('Error getting news:', err);
    res.status(500).json({ message: 'Failed to get news' });
  }
};

// Create a news item (admin only)
exports.createNews = async (req, res) => {
  try {
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      // Delete uploaded file if user is not admin
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ message: 'Not authorized to create news' });
    }

    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/news/${path.basename(req.file.path)}`;
    }

    // Add to database
    const [result] = await pool.query(
      'INSERT INTO news (title, content, image, user_id) VALUES (?, ?, ?, ?)',
      [title, content, imagePath, req.userId]
    );

    const [newNews] = await pool.query(`
      SELECT n.*, u.name as author_name
      FROM news n
      JOIN users u ON n.user_id = u.id
      WHERE n.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'News created successfully',
      news: newNews[0]
    });
  } catch (err) {
    // Delete uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error creating news:', err);
    res.status(500).json({ message: 'Failed to create news' });
  }
};

// Update a news item (admin only)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      // Delete uploaded file if user is not admin
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ message: 'Not authorized to update news' });
    }

    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Get existing news to check if we need to delete old image
    const [existingNews] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    
    if (existingNews.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    let imagePath = existingNews[0].image;
    
    // If new image is uploaded
    if (req.file) {
      imagePath = `/uploads/news/${path.basename(req.file.path)}`;
      
      // Delete old image if it exists
      if (existingNews[0].image) {
        const oldFilePath = path.join('public', existingNews[0].image);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Update in database
    await pool.query(
      'UPDATE news SET title = ?, content = ?, image = ? WHERE id = ?',
      [title, content, imagePath, id]
    );

    const [updatedNews] = await pool.query(`
      SELECT n.*, u.name as author_name
      FROM news n
      JOIN users u ON n.user_id = u.id
      WHERE n.id = ?
    `, [id]);

    res.status(200).json({
      message: 'News updated successfully',
      news: updatedNews[0]
    });
  } catch (err) {
    // Delete uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error updating news:', err);
    res.status(500).json({ message: 'Failed to update news' });
  }
};

// Delete a news item (admin only)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to delete news' });
    }

    // Get news to delete the image file
    const [news] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    
    if (news.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Delete image from filesystem if it exists
    if (news[0].image) {
      const filePath = path.join('public', news[0].image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await pool.query('DELETE FROM news WHERE id = ?', [id]);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error('Error deleting news:', err);
    res.status(500).json({ message: 'Failed to delete news' });
  }
};
