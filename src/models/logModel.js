const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: { type: String, enum: ['error', 'warn', 'info'], default: 'error' },
  context: String,
  message: String,
  status: String,
  statusText: String,
  stack: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
