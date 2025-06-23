// server/models/BloodRequest.js

import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  requesterHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responderHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

export default BloodRequest;
