const express = require('express');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');
const router = express.Router();

// Get all payments
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments' });
  }
});

// Create new payment
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating payment with data:', req.body);

    // Validate required fields
    const { tenant, property, amount } = req.body;
    if (!tenant || !property || !amount) {
      return res.status(400).json({
        message: 'Missing required fields',
        details: {
          tenant: !tenant ? 'Tenant is required' : null,
          property: !property ? 'Property is required' : null,
          amount: !amount ? 'Amount is required' : null
        }
      });
    }

    // Create new payment
    const payment = new Payment({
      tenant,
      property,
      amount: Number(amount),
      date: new Date(),
      status: 'paid'
    });

    const savedPayment = await payment.save();
    console.log('Payment saved successfully:', savedPayment);
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      message: 'Error creating payment',
      details: error.message
    });
  }
});

// Update payment status
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['paid', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Error updating payment' });
  }
});

// Delete payment
router.delete('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Error deleting payment' });
  }
});

module.exports = router;