// server/models/HealthRecord.js

import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
  },
  systolicBP: {
    type: Number,
    required: true,
    min: 80,
    max: 180,
  },
  diastolicBP: {
    type: Number,
    required: true,
    min: 50,
    max: 120,
  },
  hemoglobin: {
    type: Number,
    min: 10,
    max: 20,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

export default HealthRecord;
