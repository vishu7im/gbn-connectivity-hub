
const News = require('../models/News');
const User = require('../models/User');

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    
    res.status(200).json(news);
  } catch (error) {
    console.error('Error getting news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.status(200).json(news);
  } catch (error) {
    console.error('Error getting news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create news
exports.createNews = async (req, res) => {
  try {
    const { title, content, imageUrl, isImportant } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Only admin can create news
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to create news' });
    }
    
    const news = new News({
      title,
      content,
      imageUrl,
      isImportant: isImportant || false,
      user: req.userId
    });
    
    await news.save();
    
    res.status(201).json({ message: 'News created successfully', news });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const { title, content, imageUrl, isImportant } = req.body;
    const newsId = req.params.id;
    
    // Check if news exists
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Only admin can update news
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update news' });
    }
    
    // Update fields
    news.title = title || news.title;
    news.content = content || news.content;
    
    // Only update imageUrl if provided
    if (imageUrl !== undefined) {
      news.imageUrl = imageUrl;
    }
    
    if (isImportant !== undefined) {
      news.isImportant = isImportant;
    }
    
    await news.save();
    
    res.status(200).json({ message: 'News updated successfully', news });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    
    // Check if news exists
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Only admin can delete news
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete news' });
    }
    
    await News.deleteOne({ _id: newsId });
    
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get important news
exports.getImportantNews = async (req, res) => {
  try {
    const news = await News.find({ isImportant: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    res.status(200).json(news);
  } catch (error) {
    console.error('Error getting important news:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
