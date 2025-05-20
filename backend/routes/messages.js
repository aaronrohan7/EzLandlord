const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const router = express.Router();

// Get all messages for a user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.email },
        { recipient: req.user.email }
      ]
    }).sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.email,
      recipient: req.body.recipient,
      content: req.body.content
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Mark message as read
router.patch('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.read = true;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Error updating message' });
  }
});

module.exports = router;