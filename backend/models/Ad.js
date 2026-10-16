import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  badge: {
    type: String,
    default: 'SPECIAL ANNOUNCEMENT'
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Explore Now'
  },
  buttonLink: {
    type: String,
    default: '#/therapy'
  },
  buttonActionType: {
    type: String,
    enum: ['link', 'franchise', 'whatsapp', 'call'],
    default: 'link'
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 1
  },
  discountTag: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const Ad = mongoose.model('Ad', adSchema);
