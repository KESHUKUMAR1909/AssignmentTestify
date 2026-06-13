const mongoose = require('mongoose');

const sopSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  revisionDate: { type: Date, required: true },
  content: { type: String }, // Rich text or HTML content
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  versionHistory: [{
    version: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('SOP', sopSchema);
