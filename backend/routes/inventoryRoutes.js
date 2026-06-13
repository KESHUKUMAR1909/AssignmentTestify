const express = require('express');
const Inventory = require('../models/Inventory');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, async (req, res) => {
    try {
      const items = await Inventory.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protect, authorize('Owner', 'Admin', 'Department_Head'), async (req, res) => {
    try {
      const item = await Inventory.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.route('/:id')
  .put(protect, authorize('Owner', 'Admin', 'Department_Head'), async (req, res) => {
    try {
      const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
