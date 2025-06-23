// server/models/BloodInventory.js

import mongoose from 'mongoose';

const bloodInventorySchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  units: {
    type: Number,
    required: true,
    min: 1,
  },
  volumePerUnit: {
    type: Number,
    default: 450,
    min: 350,
    max: 500,
  },
  source: {
    type: String,
    enum: ['donation', 'transfer', 'other'],
    default: 'donation',
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);

export default BloodInventory;