
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { verifyToken, verifyUserStatus } = require('../middleware/auth.middleware');

// Get all jobs (with pagination)
router.get('/', jobController.getAllJobs);

// Get a single job
router.get('/:id', jobController.getJobById);

// Create a new job (requires verified status)
router.post('/', verifyToken, verifyUserStatus, jobController.createJob);

// Get jobs posted by a user
router.get('/user/:userId', jobController.getJobsByUser);

// Update a job
router.put('/:id', verifyToken, jobController.updateJob);

// Delete a job
router.delete('/:id', verifyToken, jobController.deleteJob);

module.exports = router;
