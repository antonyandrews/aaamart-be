const mongoose = require("mongoose");

const tenantSchema = mongoose.Schema({
  tenantName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String,
    required: true
  },
  isActive: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = mongoose.model("Tenant", tenantSchema);