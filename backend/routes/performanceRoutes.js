const express = require('express');
const Performance = require('../models/Performance');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, async (req, res) => {
    try {
      let query = {};
      // Employees only see their own reviews
      if (req.user.role === 'Employee') {
        query.employeeId = req.user._id;
      }
      const reviews = await Performance.find(query)
        .populate('employeeId', 'name department')
        .populate('reviewerId', 'name');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protect, authorize('HR_Manager', 'Admin', 'Department_Head', 'Owner'), async (req, res) => {
    try {
      const review = await Performance.create({ ...req.body, reviewerId: req.user._id });
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
