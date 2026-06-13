const express = require('express');
const SOP = require('../models/SOP');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, async (req, res) => {
    try {
      const sops = await SOP.find().populate('createdBy', 'name');
      res.json(sops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protect, authorize('Owner', 'Admin', 'Department_Head'), async (req, res) => {
    try {
      const sop = await SOP.create({ ...req.body, createdBy: req.user._id });
      res.status(201).json(sop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
