const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who sent the message
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Timestamp for message creation
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
