
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a single job
router.get('/:id', jobController.getJobById);

// Create a new job
router.post('/', verifyToken, jobController.createJob);

// Get jobs posted by a user
router.get('/user/:userId', jobController.getJobsByUser);

module.exports = router;
