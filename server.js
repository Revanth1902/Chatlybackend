const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIO = require('socket.io');
const GroupModel = require("./models/gropuModel"); // Fixed typo in model import
const MessageModel = require("./models/messageModel");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb+srv://revanth19a:revanth@cluster0.4jsmfp8.mongodb.net/chatly', {

}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Socket.IO setup
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_group', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  socket.on('group_message', async (data) => {
    const { groupId, sender, message } = data;

    // Save the message to the database
    const newMessage = new MessageModel({ sender, message });
    await newMessage.save();

    // Add the message to the group's messages array
    await GroupModel.findByIdAndUpdate(groupId, { $push: { messages: newMessage._id } });

    // Broadcast the message to all users in the group
    io.to(groupId).emit('group_message', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
const userRoutes = require('./routes/userRoute');
const groupRoutes = require('./routes/gropuroutes');
const messageRoutes = require('./routes/messageroute'); // Added message routes

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes); // Added message routes

// Start the server
const PORT = process.env.PORT || 5001 || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
