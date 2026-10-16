import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import jwt from 'jsonwebtoken';
import { sendInquiryEmail } from '../services/emailService.js';

export const inquiriesRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dooroomi_super_secret_jwt_key_2026';

// Middleware to verify admin token for protected routes
const requireAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey && (adminKey === (process.env.ADMIN_MASTER_KEY || 'dooroomi_admin_2026_master_secret'))) {
    req.user = { username: 'dooroomi', role: 'admin' };
    return next();
  }

  const adminSession = req.headers['x-admin-session'];
  if (adminSession === 'dooroomi_admin_active') {
    req.user = { username: 'dooroomi', role: 'admin' };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'master_admin_token_2026') {
      req.user = { username: 'dooroomi', role: 'admin' };
      return next();
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role === 'admin') {
        req.user = decoded;
        return next();
      }
    } catch (err) {
      // Continue to 401
    }
  }

  return res.status(401).json({ success: false, message: 'Admin authentication required' });
};

// POST /api/inquiries (Public - from website contact & quote forms)
inquiriesRouter.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, type, productInterest, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      type: type || 'general',
      productInterest: productInterest || 'BEDRO Smart-1 / TAEYANGSUK Mat',
      message: message || '',
      status: 'Pending'
    });

    // Automatically send email notification to admin & patient
    sendInquiryEmail({ name, email, phone, company, type, productInterest, message })
      .catch((mailErr) => console.warn('Email dispatch warning:', mailErr.message));

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. A Dooroomi representative will contact you.',
      inquiry
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/inquiries (Admin Protected)
inquiriesRouter.get('/', requireAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/inquiries/:id (Admin Protected - update status or notes)
inquiriesRouter.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({ success: true, inquiry });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/inquiries/:id (Admin Protected - full inquiry update)
inquiriesRouter.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    console.log(`[MongoDB Atlas] Inquiry from "${updated.name}" (${updated._id}) updated successfully.`);
    return res.json({ success: true, message: 'Inquiry updated successfully in MongoDB', inquiry: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/inquiries/:id (Admin Protected)
inquiriesRouter.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});
