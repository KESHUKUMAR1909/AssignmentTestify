const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Unseen', 'In-Progress', 'Completed', 'Overdue'], 
    default: 'Unseen' 
  },
  subtasks: [subtaskSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
