
const { pool } = require('../config/db.config');

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query(`
      SELECT j.*, u.name as posted_by_name
      FROM jobs j
      JOIN users u ON j.user_id = u.id
      ORDER BY j.created_at DESC
    `);

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error getting jobs:', err);
    res.status(500).json({ message: 'Failed to get jobs' });
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [jobs] = await pool.query(`
      SELECT j.*, u.name as posted_by_name, u.email as contact_email
      FROM jobs j
      JOIN users u ON j.user_id = u.id
      WHERE j.id = ?
    `, [id]);

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(jobs[0]);
  } catch (err) {
    console.error('Error getting job:', err);
    res.status(500).json({ message: 'Failed to get job' });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      job_type,
      description,
      requirements,
      salary_range,
      contact_email,
      deadline
    } = req.body;
    
    const userId = req.userId;

    // Validate input
    if (!title || !company || !location || !job_type || !description || !requirements) {
      return res.status(400).json({
        message: 'Please provide title, company, location, job type, description and requirements'
      });
    }

    // Create job
    const [result] = await pool.query(
      `INSERT INTO jobs (
        user_id, title, company, location, job_type,
        description, requirements, salary_range, contact_email, deadline
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, title, company, location, job_type,
        description, requirements, salary_range || null,
        contact_email || null, deadline || null
      ]
    );

    // Get the created job
    const [newJob] = await pool.query(`
      SELECT j.*, u.name as posted_by_name
      FROM jobs j
      JOIN users u ON j.user_id = u.id
      WHERE j.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Job created successfully',
      job: newJob[0]
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// Get jobs posted by a user
exports.getJobsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [jobs] = await pool.query(`
      SELECT j.*, u.name as posted_by_name
      FROM jobs j
      JOIN users u ON j.user_id = u.id
      WHERE j.user_id = ?
      ORDER BY j.created_at DESC
    `, [userId]);

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error getting user jobs:', err);
    res.status(500).json({ message: 'Failed to get user jobs' });
  }
};
