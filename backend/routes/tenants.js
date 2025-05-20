const express = require('express');
const auth = require('../middleware/auth');
const Tenant = require('../models/Tenant');
const router = express.Router();

// Get all tenants
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all tenants...');
    const tenants = await Tenant.find();
    console.log(`Found ${tenants.length} tenants`);
    res.json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ message: 'Error fetching tenants' });
  }
});

// Add new tenant
router.post('/', async (req, res) => {
  try {
    console.log('Creating new tenant with data:', req.body);
    const tenant = new Tenant(req.body);
    const savedTenant = await tenant.save();
    console.log('Tenant created successfully:', savedTenant);
    res.status(201).json(savedTenant);
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete tenant
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting tenant with ID:', req.params.id);
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      console.log('Tenant not found');
      return res.status(404).json({ message: 'Tenant not found' });
    }
    console.log('Tenant deleted successfully');
    res.json({ message: 'Tenant deleted' });
  } catch (error) {
    console.error('Error deleting tenant:', error);
    res.status(500).json({ message: 'Error deleting tenant' });
  }
});

module.exports = router;