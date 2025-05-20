const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const auth = require('../middleware/auth');

// Get all maintenance requests
router.get('/', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.find().sort({ date: -1 });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create maintenance request
router.post('/', auth, async (req, res) => {
  const maintenance = new Maintenance({
    tenant: req.body.tenant,
    property: req.body.property,
    issue: req.body.issue,
    priority: req.body.priority,
    status: 'Pending'
  });

  try {
    const newMaintenance = await maintenance.save();
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update maintenance status
router.patch('/:id', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (maintenance) {
      maintenance.status = req.body.status;
      const updatedMaintenance = await maintenance.save();
      res.json(updatedMaintenance);
    } else {
      res.status(404).json({ message: 'Maintenance request not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;