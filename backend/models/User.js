const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  rollNumber: {
    type: String,
    trim: true
  },
  graduation: {
    type: String,
    trim: true
  },
  currentRole: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    trim: true
  },
  facebook: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'blocked'],
    default: 'pending'
  },
  rejectionRemarks: {
    type: String,
    default: ''
  },
  verificationDocuments: {
    type: String,
    default: ''
  },
  documentUploadDate: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Virtual to add 'id' property that maps to _id
UserSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Configure toJSON method to include virtuals
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Don't expose password
    return ret;
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
