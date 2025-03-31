
const { pool } = require('../config/db.config');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Run multiple queries in parallel for better performance
    const [totalUsersResult] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [pendingUsersResult] = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_verified = FALSE');
    const [totalPostsResult] = await pool.query('SELECT COUNT(*) as count FROM posts');
    const [totalJobsResult] = await pool.query('SELECT COUNT(*) as count FROM jobs');
    const [totalGalleryImagesResult] = await pool.query('SELECT COUNT(*) as count FROM gallery');
    const [totalEventsResult] = await pool.query('SELECT COUNT(*) as count FROM events');
    
    // Active users (users who logged in within the last 30 days)
    const [activeUsersResult] = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM visits 
      WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);

    // Get posts by month for the last 6 months
    const [postsByMonthResult] = await pool.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %Y') as month, 
        COUNT(*) as count 
      FROM posts 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY month
      ORDER BY created_at
    `);

    const stats = {
      totalUsers: totalUsersResult[0].count,
      pendingUsers: pendingUsersResult[0].count,
      totalPosts: totalPostsResult[0].count,
      totalJobs: totalJobsResult[0].count,
      totalGalleryImages: totalGalleryImagesResult[0].count,
      totalEvents: totalEventsResult[0].count,
      activeUsers: activeUsersResult[0].count,
      postsByMonth: postsByMonthResult
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
    
    // Record the visit
    await pool.query(
      'INSERT INTO visits (user_id, visited_at) VALUES (?, NOW())',
      [userId || null]
    );
    
    res.status(200).json({ message: 'Visit tracked' });
  } catch (err) {
    console.error('Error tracking visit:', err);
    res.status(500).json({ message: 'Error tracking visit' });
  }
};
