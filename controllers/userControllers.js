const bcrypt = require("bcrypt");
const UserModel = require("../models/usermodel");
const RequestModel = require("../models/requestModel");
const UserController = {
  signup: async (req, res) => {
    try {
      const { username, name, password } = req.body;

      // Check if the username already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        username,
        name,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Return the user object without the password field
      return res
        .status(200)
        .json({ user: { username: user.username, name: user.name } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateProfilePicture: async (req, res) => {
    try {
      const { username } = req.params;
      const { profilePicture } = req.body;

      // Find the user by username and update the profile picture
      await UserModel.findOneAndUpdate({ username }, { profilePicture });

      return res
        .status(200)
        .json({ message: "Profile picture updated successfully", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserDetailsByUsername: async (req, res) => {
    try {
      const { username } = req.params;

      // Find the user by username
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the user object without the password field
      return res.status(200).json({
        user: {
          username: user.username,
          name: user.name,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUserDetails: async (req, res) => {
    try {
      const { username } = req.params;
      const { name, profilePicture } = req.body;

      // Update user details
      await UserModel.findOneAndUpdate({ username }, { name, profilePicture });

      return res
        .status(200)
        .json({ message: "User details updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  sendRequest: async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;

      // Create a new request
      const request = new RequestModel({
        sender: senderId,
        receiver: receiverId,
      });

      // Save the request to the database
      await request.save();

      return res.status(201).json({ message: "Request sent successfully" ,request });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  acceptRequest: async (req, res) => {
    try {
      const { senderId, requestId } = req.params;

      // Update the request status to 'accepted'
      await RequestModel.findByIdAndUpdate(requestId, { status: "accepted" });

      // You can add further logic here, like creating a chat session

      return res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  declineRequest: async (req, res) => {
    try {
      const { senderId, requestId } = req.params;

      // Update the request status to 'declined'
      await RequestModel.findByIdAndUpdate(requestId, { status: "declined" });

      return res.status(200).json({ message: "Request declined successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  blockUser: async (req, res) => {
    try {
      const { userId, blockedUserId } = req.params;

      // Add blockedUserId to the user's blockedUsers array
      await UserModel.findByIdAndUpdate(userId, {
        $addToSet: { blockedUsers: blockedUserId },
      });

      return res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  unblockUser: async (req, res) => {
    try {
      const { userId, blockedUserId } = req.params;

      // Remove blockedUserId from the user's blockedUsers array
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { blockedUsers: blockedUserId },
      });

      return res.status(200).json({ message: "User unblocked successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  reportUser: async (req, res) => {
    try {
      const { reportedUserId } = req.params;

      // Increment the number of reports received by the reported user
      await UserModel.findByIdAndUpdate(reportedUserId, {
        $inc: { reports: 1 },
      });

      return res.status(200).json({ message: "User reported successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by userId and delete their account if reports > 3
      const user = await UserModel.findById(userId);
      if (user.reports > 3) {
        await UserModel.findByIdAndDelete(userId);
        return res
          .status(200)
          .json({ message: "Account deleted successfully" });
      }

      return res.status(400).json({ message: "Account cannot be deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
