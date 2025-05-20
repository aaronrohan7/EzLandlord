const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Terminated'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lease', leaseSchema);