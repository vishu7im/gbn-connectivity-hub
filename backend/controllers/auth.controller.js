
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, batch, department, rollNumber, graduation } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password,
      batch,
      department,
      rollNumber,
      graduation,
      verificationStatus: 'pending'
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || '65072d0281127af6a924e65d',
      { expiresIn: '30d' }
    );
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      message: 'Registration successful! Your account is pending verification.',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for admin login
    if (email === 'admin' && password === '12345678') {
      // Check if admin exists, if not create one
      let admin = await User.findOne({ email: 'admin@gbnpolytechnic.ac.in' });
      
      if (!admin) {
        // Create admin user
        const hashedPassword = await bcrypt.hash('12345678', 10);
        admin = new User({
          name: 'Admin',
          email: 'admin@gbnpolytechnic.ac.in',
          password: hashedPassword,
          isAdmin: true,
          isVerified: true,
          verificationStatus: 'approved'
        });
        
        await admin.save();
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || '65072d0281127af6a924e65d',
        { expiresIn: '30d' }
      );
      
      // Update last login
      admin.lastLogin = new Date();
      await admin.save();
      
      // Return admin without password
      const adminResponse = admin.toObject();
      delete adminResponse.password;
      
      return res.status(200).json({
        message: 'Admin login successful',
        token,
        user: adminResponse
      });
    }
    
    // Regular user login
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || '65072d0281127af6a924e65d',
      { expiresIn: '30d' }
    );
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pending users (for admin)
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ verificationStatus: 'pending' })
      .select('name email batch department createdAt')
      .sort({ createdAt: -1 });
    
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error('Get pending users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { 
      name, currentRole, company, location, 
      phone, bio, linkedin, facebook, twitter 
    } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (currentRole) user.currentRole = currentRole;
    if (company) user.company = company;
    if (location) user.location = location;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (linkedin) user.linkedin = linkedin;
    if (facebook) user.facebook = facebook;
    if (twitter) user.twitter = twitter;
    
    await user.save();
    
    // Return updated user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
