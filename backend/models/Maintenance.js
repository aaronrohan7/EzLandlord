const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);