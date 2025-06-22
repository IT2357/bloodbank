// server/models/Notification.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["reminder", "urgent", "info", "approval"],
    default: "info",
  },
  isRead: { type: Boolean, default: false },

  // Admin notes field to track which admin created the notification
  adminNotes: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to admin user
    },
    notes: { type: String }, // Additional notes from admin
    createdAt: { type: Date, default: Date.now },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
