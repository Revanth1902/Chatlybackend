const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    online: { type: Boolean, default: false },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of blocked users
    reports: { type: Number, default: 0 } // Number of reports received
  });
  
  

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
