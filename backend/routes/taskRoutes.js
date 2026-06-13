const express = require('express');
const Task = require('../models/Task');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, authorize('Owner', 'Admin'), async (req, res) => {
    try {
      const task = await Task.create({
        ...req.body,
        createdBy: req.user._id
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .get(protect, async (req, res) => {
    try {
      let query = {};
      if (req.user.role === 'Employee') {
        query.assignee = req.user._id;
      }
      
      if (req.query.status) query.status = req.query.status;
      
      const tasks = await Task.find(query).populate('assignee', 'name email').populate('createdBy', 'name email');
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      
      if (req.user.role === 'Employee' && task.assignee.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      if (req.user.role === 'Employee') {
        // Employee can only update status or subtasks
        if (req.body.status) task.status = req.body.status;
        if (req.body.subtasks) task.subtasks = req.body.subtasks;
      } else {
        // Admin/Owner can update everything
        Object.assign(task, req.body);
      }
      
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
