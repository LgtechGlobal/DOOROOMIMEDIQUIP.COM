import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['quote', 'therapy_center_visit', 'general', 'b2b_distributor'],
    default: 'general'
  },
  productInterest: {
    type: String,
    default: 'BEDRO Smart-1 / TAEYANGSUK Mat'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
