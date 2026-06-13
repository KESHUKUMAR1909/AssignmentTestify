const mongoose = require('mongoose');

const hrEmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  designation: { type: String, required: true },
  documents: [{
    docType: { type: String }, // e.g., 'Offer Letter', 'BGV Document'
    url: { type: String },
    uploadedAt: { type: Date, default: Date.now }
  }],
  violations: [{
    description: { type: String },
    date: { type: Date, default: Date.now },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('HrEmployee', hrEmployeeSchema);
