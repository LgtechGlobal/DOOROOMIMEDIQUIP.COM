import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Visitor (Incomplete Form)',
    trim: true
  },
  email: {
    type: String,
    default: '',
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
    enum: ['Pending', 'Contacted', 'In Progress', 'Completed', 'Draft / Abandoned'],
    default: 'Pending'
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
