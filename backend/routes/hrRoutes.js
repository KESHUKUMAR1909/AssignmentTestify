const express = require('express');
const HrEmployee = require('../models/HrEmployee');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, authorize('HR_Manager', 'Admin', 'Owner'), async (req, res) => {
    try {
      const employees = await HrEmployee.find().populate('userId', 'name email role');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protect, authorize('HR_Manager', 'Admin', 'Owner'), async (req, res) => {
    try {
      const employee = await HrEmployee.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
