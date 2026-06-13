const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  minimumThreshold: { type: Number, required: true, default: 5 },
  vendorName: { type: String },
  unitPrice: { type: Number },
  status: { type: String, enum: ['In-Stock', 'Low-Stock', 'Out-of-Stock'], default: 'In-Stock' },
  lastRestocked: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
