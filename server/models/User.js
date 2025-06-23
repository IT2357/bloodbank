// server/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Donor name or Hospital Contact Person Name
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  address: { type: String },

  role: {
    type: String,
    enum: ['donor', 'hospital', 'admin'],
    required: true,
  },

  // Donor-specific
  dateOfBirth: { type: Date },
  gender: { type: String },
  bloodGroup: { type: String },

  // Hospital-specific
  hospitalName: { type: String },
  licenseNumber: { type: String },

  isApproved: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

// Virtual field to calculate age from date of birth
userSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
