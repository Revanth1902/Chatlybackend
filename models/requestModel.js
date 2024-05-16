const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  // You can add more fields as needed
});

const RequestModel = mongoose.model('Request', RequestSchema);

module.exports = RequestModel;
