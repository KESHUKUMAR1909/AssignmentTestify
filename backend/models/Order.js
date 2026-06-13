const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  amount: { type: Number, required: true },
  invoiceNo: { type: String },
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Draft', 'Open', 'In Progress', 'Completed', 'Invoiced'],
    default: 'Draft'
  },
  customFields: { type: Map, of: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  samples: [{
    sampleId: { type: String },
    reportUrl: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
