
const User = require('../models/User');
const Post = require('../models/Post');
const Job = require('../models/Job');
const Gallery = require('../models/Gallery');
const Event = require('../models/Event');
const News = require('../models/News');
const Visit = require('../models/Visit');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Run multiple queries in parallel for better performance
    const [
      totalUsers,
      pendingUsers,
      rejectedUsers,
      totalPosts,
      blockedPosts,
      totalJobs,
      activeJobs,
      totalGalleryImages,
      totalEvents,
      totalNews
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ verificationStatus: 'pending' }),
      User.countDocuments({ verificationStatus: 'rejected' }),
      Post.countDocuments(),
      Post.countDocuments({ isBlocked: true }),
      Job.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Gallery.countDocuments(),
      Event.countDocuments(),
      News.countDocuments()
    ]);
    
    // Get active users (users who visited within the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await Visit.distinct('user', {
      visitedAt: { $gte: thirtyDaysAgo },
      user: { $ne: null }
    });
    
    // Get posts by month for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const posts = await Post.find({
      createdAt: { $gte: sixMonthsAgo }
    }).select('createdAt');
    
    // Format posts by month
    const postsByMonth = {};
    posts.forEach(post => {
      const month = post.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
      postsByMonth[month] = (postsByMonth[month] || 0) + 1;
    });
    
    const formattedPostsByMonth = Object.entries(postsByMonth).map(([month, count]) => ({
      month,
      count
    }));
    
    // Get daily visits for the last 30 days
    const visits = await Visit.aggregate([
      {
        $match: {
          visitedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const dailyVisits = visits.map(visit => ({
      date: visit._id,
      count: visit.count
    }));

    const stats = {
      totalUsers,
      pendingUsers,
      rejectedUsers,
      totalPosts,
      blockedPosts,
      totalJobs,
      activeJobs,
      totalGalleryImages,
      totalEvents,
      totalNews,
      activeUsers: activeUsers.length,
      postsByMonth: formattedPostsByMonth,
      dailyVisits
    };

    res.json(stats);
  } catch (err) {
    console.error('Error getting dashboard stats:', err);
    res.status(500).json({ message: 'Error getting dashboard statistics' });
  }
};

// Track site visit
exports.trackVisit = async (req, res) => {
  try {
    const { userId } = req.body;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Record the visit
    await Visit.create({
      user: userId || null,
      userAgent,
      ipAddress
    });
    
    res.status(200).json({ message: 'Visit tracked' });
  } catch (err) {
    console.error('Error tracking visit:', err);
    res.status(500).json({ message: 'Error tracking visit' });
  }
};

// Pending user verifications
exports.getPendingVerifications = async (req, res) => {
  try {
    const pendingUsers = await User.find({ verificationStatus: 'pending' })
      .select('name email batch department createdAt')
      .sort({ createdAt: -1 });
    
    res.status(200).json(pendingUsers);
  } catch (err) {
    console.error('Error getting pending verifications:', err);
    res.status(500).json({ message: 'Error getting pending verifications' });
  }
};

// Verify or reject user
exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, remarks } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.verificationStatus = status;
    user.isVerified = status === 'approved';
    if (status === 'rejected' && remarks) {
      user.rejectionRemarks = remarks;
    }
    
    await user.save();
    
    // Send email notification
    const { sendVerificationEmail } = require('../config/mailer.config');
    await sendVerificationEmail(user.email, user.name, status, remarks);
    
    res.status(200).json({ 
      message: `User ${status === 'approved' ? 'verified' : 'rejected'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verificationStatus: user.verificationStatus
      }
    });
  } catch (err) {
    console.error('Error verifying user:', err);
    res.status(500).json({ message: 'Error processing verification' });
  }
};

// Block or unblock a post
exports.moderatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { action, reason } = req.body;
    
    if (!['block', 'unblock'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.isBlocked = action === 'block';
    if (action === 'block' && reason) {
      post.blockReason = reason;
    }
    
    await post.save();
    
    res.status(200).json({
      message: `Post ${action === 'block' ? 'blocked' : 'unblocked'} successfully`
    });
  } catch (err) {
    console.error('Error moderating post:', err);
    res.status(500).json({ message: 'Error moderating post' });
  }
};
