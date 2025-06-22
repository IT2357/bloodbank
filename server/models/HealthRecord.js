// server/models/HealthRecord.js

const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weight: { type: Number, required: true },
  height: { type: Number },
  systolicBP: {
    type: Number,
    required: true,
    min: 80,
    max: 180, // some tolerance range
    // Typical unit: mmHg (millimeters of mercury)
    // Around 90 to 120 mmHg for a healthy adult
  },
  diastolicBP: {
    type: Number,
    required: true,
    min: 50,
    max: 120,
    // Typical unit: mmHg
    // Around 60 to 80 mmHg for a healthy adult
  },
  hemoglobin: {
    type: Number,
    min: 10, // conservative lower bound
    max: 20, // safe upper bound
    // Typical unit: g/dL (grams per deciliter)
    // Usually around 13.5 to 17.5 g/dL for men
    // and 12.0 to 15.5 g/dL for women
  },

  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Hospital
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
