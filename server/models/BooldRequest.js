// server/models/BloodRequest.js

const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  requesterHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responderHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  purpose: { type: String },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  isUrgent: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
