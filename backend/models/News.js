
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  isImportant: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const News = mongoose.model('News', NewsSchema);
module.exports = News;
