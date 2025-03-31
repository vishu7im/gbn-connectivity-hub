
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db.config');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, batch, department } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, batch, department, is_verified) VALUES (?, ?, ?, ?, ?, FALSE)',
      [name, email, hashedPassword, batch || null, department || null]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Get user data without password
    const [userData] = await pool.query(
      'SELECT id, name, email, batch, department, is_alumni, is_verified FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: userData[0]
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Special case for admin login
    if (email === 'admin' && password === '12345678') {
      // Check if admin exists in database, if not create it
      const [admins] = await pool.query('SELECT * FROM users WHERE email = "admin@admin.com"');
      
      let adminId;
      
      if (admins.length === 0) {
        // Create admin user if it doesn't exist
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('12345678', salt);
        
        const [result] = await pool.query(
          'INSERT INTO users (name, email, password, is_admin, is_verified) VALUES (?, ?, ?, TRUE, TRUE)',
          ['Admin', 'admin@admin.com', hashedPassword]
        );
        
        adminId = result.insertId;
      } else {
        adminId = admins[0].id;
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: adminId },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      return res.status(200).json({
        message: 'Admin login successful',
        token,
        user: {
          id: adminId,
          name: 'Admin',
          email: 'admin@admin.com',
          is_admin: true,
          is_verified: true
        }
      });
    }

    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get pending users for approval
exports.getPendingUsers = async (req, res) => {
  try {
    // Check if the requester is an admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to view pending users' });
    }

    // Get pending users
    const [pendingUsers] = await pool.query(`
      SELECT id, name, email, batch, department, created_at
      FROM users
      WHERE is_verified = FALSE
      ORDER BY created_at DESC
    `);

    res.status(200).json(pendingUsers);
  } catch (err) {
    console.error('Error getting pending users:', err);
    res.status(500).json({ message: 'Failed to get pending users' });
  }
};

// Verify user by admin
exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if the requester is an admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to verify users' });
    }

    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update verification status
    await pool.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [userId]);

    res.status(200).json({ message: 'User verified successfully' });
  } catch (err) {
    console.error('Error verifying user:', err);
    res.status(500).json({ message: 'Failed to verify user' });
  }
};
