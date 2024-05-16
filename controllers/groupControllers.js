// In controllers/GroupController.js

const mongoose = require("mongoose");
const GroupModel = require("../models/messageModel");

const GroupController = {
  createGroup: async (req, res) => {
    try {
      const { name, imageUrl, users } = req.body;

      // Convert user IDs to ObjectId type
      const userIds = users.map(
        (userId) => new mongoose.Types.ObjectId(userId)
      );

      // Create a new group
      const group = new GroupModel({
        name,
        imageUrl,
        users: userIds,
      });

      // Save the group to the database
      await group.save();

      return res.status(201).json({
        message: "Group created successfully",
        group: {
          _id: group._id,
          name: group.name,
          imageUrl: group.imageUrl,
          users: group.users, // Optionally, you can populate the users' details if needed
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  addUserToGroup: async (req, res) => {
    try {
      const { groupId, userId } = req.params;

      // Add userId to the group's users array
      await GroupModel.findByIdAndUpdate(groupId, {
        $addToSet: { users: userId },
      });

      return res
        .status(200)
        .json({ message: "User added to group successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { groupId } = req.params;
      const { sender, message } = req.body;

      // You can implement logic to validate if the sender is a member of the group before sending the message

      // Broadcast the message to all users in the group
      io.to(groupId).emit("group_message", { sender, message });

      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getGroupMessages: async (req, res) => {
    try {
      const { groupId } = req.params;

      // Retrieve messages for the specified group from the database
      const group = await GroupModel.findById(groupId).populate(
        "messages.sender",
        "username"
      );
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }

      return res.status(200).json({ messages: group.messages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = GroupController;
