
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db.config');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    // Check if user exists and is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }

    next();
  } catch (err) {
    console.error('Admin verification error:', err);
    return res.status(500).json({ message: 'Server error during verification' });
  }
};

const verifyUserStatus = async (req, res, next) => {
  try {
    // Check if user is verified
    const [users] = await pool.query(
      'SELECT is_verified FROM users WHERE id = ?', 
      [req.userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!users[0].is_verified) {
      return res.status(403).json({ 
        message: 'Your account is pending verification. Please wait for admin approval.'
      });
    }

    next();
  } catch (err) {
    console.error('User verification status error:', err);
    return res.status(500).json({ message: 'Server error during verification' });
  }
};

module.exports = { 
  verifyToken,
  verifyAdmin,
  verifyUserStatus
};
