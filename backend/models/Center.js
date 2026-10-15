import mongoose from 'mongoose';

const centerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    timing: { type: String, default: 'Mon–Sat: 8:00 AM – 5:00 PM' },
    status: { type: String, default: 'Active · 100% Free Daily Therapy' },
    dailyCapacity: { type: String, default: '120+ Patients/Day' }
  },
  { timestamps: true }
);

export const Center = mongoose.model('Center', centerSchema);
export default Center;
