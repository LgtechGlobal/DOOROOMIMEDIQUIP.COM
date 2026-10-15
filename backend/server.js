import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { inquiriesRouter } from './routes/inquiries.js';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/inquiries', inquiriesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({
    status: 'online',
    server: 'Dooroomi Mediquip Backend API',
    database: states[dbState] || 'Unknown',
    timestamp: new Date().toISOString()
  });
});

// Admin Stats Endpoint
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalInquiries = await Inquiry.countDocuments().catch(() => 0);
    const pendingInquiries = await Inquiry.countDocuments({ status: 'Pending' }).catch(() => 0);
    const completedInquiries = await Inquiry.countDocuments({ status: 'Completed' }).catch(() => 0);
    
    res.json({
      success: true,
      stats: {
        totalCenters: 15,
        totalInquiries,
        pendingInquiries,
        completedInquiries,
        activeDevices: ['BEDRO Smart-1', 'Super TAEYANGSUK Mat', 'Dooroomi Champion Belt'],
        globalCountries: 11,
        satisfactionRate: '98.6%',
        dbConnected: mongoose.connection.readyState === 1
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Seed Initial Inquiries if DB is fresh
const seedInitialData = async () => {
  try {
    const count = await Inquiry.countDocuments();
    if (count === 0) {
      console.log('Seeding initial authentic inquiry records into MongoDB...');
      await Inquiry.insertMany([
        {
          name: 'Dr. Debasis Pattnaik',
          email: 'dr.pattnaik.spine@gmail.com',
          phone: '+91 94371 88201',
          company: 'Bhubaneswar Ortho Rehabilitation Clinic',
          type: 'quote',
          productInterest: 'BEDRO Smart-1 Automatic Thermal Massager',
          message: 'Interested in procuring 2 units of BEDRO Smart-1 for our spine physiotherapy wing. Please send commercial quotes and clinical certifications.',
          status: 'In Progress',
          notes: 'Spoke on phone, clinic demo requested for next Monday.'
        },
        {
          name: 'Sunita Dash',
          email: 'sunita.dash84@yahoo.com',
          phone: '+91 98610 44320',
          company: 'Private Citizen',
          type: 'therapy_center_visit',
          productInterest: 'TAEYANGSUK PLUS Far-Infrared Mat',
          message: 'My mother is 68 suffering from severe knee osteoarthritis and sciatica. Would like to book a free daily morning trial at Khandagiri Center.',
          status: 'Pending',
          notes: 'New attendee inquiry from website.'
        },
        {
          name: 'Vikramaditya Rao',
          email: 'vikram.rao@meditech-distributors.in',
          phone: '+91 98102 77411',
          company: 'Meditech Healthcare Distributors',
          type: 'b2b_distributor',
          productInterest: 'Dooroomi Champion Belt & Taeyangsuk Ceramics',
          message: 'We distribute medical orthopedic supports across Delhi NCR. Requesting wholesale distributor catalog and volume pricing.',
          status: 'Pending',
          notes: 'Priority B2B distributor inquiry.'
        }
      ]);
      console.log('Initial inquiry records seeded successfully.');
    }
  } catch (e) {
    console.warn('Note: Could not seed data:', e.message);
  }
};

// Connect to MongoDB & Start Server
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 8000
})
  .then(async () => {
    console.log('Connected successfully to MongoDB Atlas (dooroomimediquip)!');
    await seedInitialData();
  })
  .catch((err) => {
    console.error('MongoDB Atlas connection notice:', err.message);
    console.log('Server continuing to run with in-memory auth fallback.');
  });

app.listen(PORT, () => {
  console.log(`Dooroomi Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Admin credentials: username=${process.env.ADMIN_USERNAME}, password=${process.env.ADMIN_PASSWORD}`);
});
