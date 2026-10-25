import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: String, default: '50 Years' },
    location: { type: String, required: true },
    disease: { type: String, required: true },
    diseaseKo: { type: String, default: '' },
    duration: { type: String, default: 'Suffering for years' },
    treatment: { type: String, default: 'BEDRO Smart-1 & Thermal Acupressure' },
    image: { type: String, default: '/assets/testimonials/patient-kmamari-sahoo.jpg' },
    rating: { type: Number, default: 5 },
    docPage: { type: Number, default: 14 },
    quote: { type: String, required: true },
    fullStory: { type: String, default: '' },
    source: { type: String, default: 'archive' },
    selectiveFeedback: { type: String, default: '' },
    verifiedScanner: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
