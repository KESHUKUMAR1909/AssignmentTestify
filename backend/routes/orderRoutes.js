const express = require('express');
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, async (req, res) => {
    try {
      const orders = await Order.find().populate('assignedTo', 'name');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protect, authorize('Owner', 'Admin'), async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.route('/:id/status')
  .put(protect, async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      order.status = req.body.status;
      await order.save();
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
