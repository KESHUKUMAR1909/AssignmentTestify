const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewPeriod: { type: String, required: true }, // e.g., 'Q1 2024'
  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: { type: String },
  goalsAchieved: [{ type: String }],
  areasOfImprovement: [{ type: String }],
  status: { type: String, enum: ['Draft', 'Submitted', 'Acknowledged'], default: 'Draft' }
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);
