    const mongoose = require('mongoose');

    const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // List of users in the group
    });

    const GroupModel = mongoose.model('Group', GroupSchema);

    module.exports = GroupModel;
