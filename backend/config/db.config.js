
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL || 'mongodb://vishal:65072d0281127af6a924e65d@almanilokheri.in:27017/almanilokheri?authSource=admin';
    
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectMongoDB };
