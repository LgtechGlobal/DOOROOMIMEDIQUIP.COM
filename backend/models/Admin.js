import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: 'dooroomi'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  name: {
    type: String,
    default: 'Dooroomi Global Administrator'
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
