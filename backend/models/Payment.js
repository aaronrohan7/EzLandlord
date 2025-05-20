const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'paid'
  }
});

module.exports = mongoose.model('Payment', paymentSchema);