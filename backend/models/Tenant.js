const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  property: { type: String, required: true },
});

module.exports = mongoose.model('Tenant', tenantSchema);