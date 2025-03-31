
const { pool } = require('../config/db.config');
const fs = require('fs');
const path = require('path');

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const [images] = await pool.query(`
      SELECT g.*, u.name as uploaded_by
      FROM gallery g
      JOIN users u ON g.user_id = u.id
      ORDER BY g.created_at DESC
    `);

    res.status(200).json(images);
  } catch (err) {
    console.error('Error getting gallery images:', err);
    res.status(500).json({ message: 'Failed to get gallery images' });
  }
};

// Upload a new image (admin only)
exports.uploadImage = async (req, res) => {
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
      return res.status(403).json({ message: 'Not authorized to upload images' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { title, description } = req.body;
    const imagePath = `/uploads/gallery/${path.basename(req.file.path)}`;

    // Add to database
    const [result] = await pool.query(
      'INSERT INTO gallery (title, description, image_path, user_id) VALUES (?, ?, ?, ?)',
      [title || null, description || null, imagePath, req.userId]
    );

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        id: result.insertId,
        title,
        description,
        image_path: imagePath,
        user_id: req.userId,
        created_at: new Date()
      }
    });
  } catch (err) {
    // Delete uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error uploading image:', err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

// Delete an image (admin only)
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to delete images' });
    }

    // Get image details to delete the file
    const [images] = await pool.query('SELECT * FROM gallery WHERE id = ?', [id]);
    
    if (images.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from filesystem
    const filePath = path.join('public', images[0].image_path);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await pool.query('DELETE FROM gallery WHERE id = ?', [id]);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};
