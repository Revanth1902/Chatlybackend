const express = require('express');
const router = express.Router();
const GroupController = require("../controllers/groupControllers"); // Corrected controller import

// Create group route
router.post('/create', GroupController.createGroup);

// Add user to group route
router.put('/:groupId/add-user/:userId', GroupController.addUserToGroup);

// Send message to group route
router.post('/:groupId/messages', GroupController.sendMessage);

// Get messages of a group route
router.get('/:groupId/messages', GroupController.getGroupMessages); // Added new route

module.exports = router;
