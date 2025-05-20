const express = require('express');
const router = express.Router();
const Lease = require('../models/Lease');
const auth = require('../middleware/auth');

// Get all leases
router.get('/', auth, async (req, res) => {
  try {
    const leases = await Lease.find().sort({ startDate: -1 });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new lease
router.post('/', auth, async (req, res) => {
  const lease = new Lease({
    tenant: req.body.tenant,
    property: req.body.property,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    rent: req.body.rent,
    status: 'Active'
  });

  try {
    const newLease = await lease.save();
    res.status(201).json(newLease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lease
router.patch('/:id', auth, async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);
    if (lease) {
      Object.assign(lease, req.body);
      const updatedLease = await lease.save();
      res.json(updatedLease);
    } else {
      res.status(404).json({ message: 'Lease not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;