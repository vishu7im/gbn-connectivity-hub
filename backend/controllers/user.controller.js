
const { pool } = require('../config/db.config');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT id, name, email, batch, department, current_role, company, location,
             is_alumni, is_verified, created_at
      FROM users
      ORDER BY name ASC
    `);

    res.status(200).json(users);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [users] = await pool.query(`
      SELECT id, name, email, batch, department, current_role, company, location,
             bio, linkedin, facebook, is_alumni, is_verified, created_at
      FROM users
      WHERE id = ?
    `, [id]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

// Get current user profile
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.userId;
    
    const [users] = await pool.query(`
      SELECT id, name, email, batch, department, current_role, company, location,
             phone, bio, linkedin, facebook, is_alumni, is_verified, created_at
      FROM users
      WHERE id = ?
    `, [userId]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Error getting profile:', err);
    res.status(500).json({ message: 'Failed to get profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      current_role,
      company,
      location,
      phone,
      bio,
      linkedin,
      facebook
    } = req.body;

    // Update user profile
    await pool.query(`
      UPDATE users
      SET name = ?,
          current_role = ?,
          company = ?,
          location = ?,
          phone = ?,
          bio = ?,
          linkedin = ?,
          facebook = ?
      WHERE id = ?
    `, [
      name,
      current_role || null,
      company || null,
      location || null,
      phone || null,
      bio || null,
      linkedin || null,
      facebook || null,
      userId
    ]);

    // Get updated profile
    const [updatedUser] = await pool.query(`
      SELECT id, name, email, batch, department, current_role, company, location,
             phone, bio, linkedin, facebook, is_alumni, is_verified, created_at
      FROM users
      WHERE id = ?
    `, [userId]);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser[0]
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Admin: Verify a user
exports.verifyUser = async (req, res) => {
  try {
    const adminId = req.userId;
    const { id } = req.params;

    // Check if the requester is an admin (you might want to add an is_admin column to the users table)
    const [admins] = await pool.query('SELECT * FROM users WHERE id = ? AND is_admin = TRUE', [adminId]);
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to perform this action' });
    }

    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update verification status
    await pool.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [id]);

    res.status(200).json({ message: 'User verified successfully' });
  } catch (err) {
    console.error('Error verifying user:', err);
    res.status(500).json({ message: 'Failed to verify user' });
  }
};
