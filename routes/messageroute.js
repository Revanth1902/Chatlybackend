const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

// GET all messages
router.get('/get', MessageController.getAllMessages);

// GET message by ID
router.get('/:messageId', MessageController.getMessageById);

// POST create a new message
router.post('/create', MessageController.createMessage);

// PUT update message by ID
router.put('/:messageId', MessageController.updateMessage);

// DELETE message by ID
router.delete('/:messageId', MessageController.deleteMessage);

module.exports = router;
