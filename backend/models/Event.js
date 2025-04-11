
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  registrationLink: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
