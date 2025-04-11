
const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  visitedAt: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String,
    trim: true
  },
  ipAddress: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Visit = mongoose.model('Visit', VisitSchema);
module.exports = Visit;
