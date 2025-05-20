const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['landlord', 'tenant'],
    default: 'landlord'
  },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);