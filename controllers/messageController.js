const MessageModel = require('../models/messageModel');

const MessageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await MessageModel.find().populate('sender', 'username'); // Populate sender details
      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getMessageById: async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const message = await MessageModel.findById(messageId).populate('sender', 'username'); // Populate sender details
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      return res.status(200).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createMessage: async (req, res) => {
    try {
      const { sender, message } = req.body;
      const newMessage = new MessageModel({ sender, message });
      await newMessage.save();
      return res.status(201).json({ message: 'Message created successfully', newMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateMessage: async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const { message } = req.body;
      const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, { message }, { new: true });
      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
      return res.status(200).json({ message: 'Message updated successfully', updatedMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = MessageController;
