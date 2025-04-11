
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '65072d0281127af6a924e65d');
    
    // Set userId in request
    req.userId = decoded.id;
    
    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Verify if user is an admin
exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    
    next();
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify if user is verified
exports.verifyAlumni = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isVerified) {
      return res.status(403).json({ message: 'Account not verified' });
    }
    
    next();
  } catch (error) {
    console.error('Alumni verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
