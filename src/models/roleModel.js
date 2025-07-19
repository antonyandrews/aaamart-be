const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roleName: { type: String, required: true },
  spec_id: { type: Number, required: true },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', roleSchema);