import express from 'express';
import { Center } from '../models/Center.js';
import { verifyToken } from './auth.js';

export const centersRouter = express.Router();

// GET all centers
centersRouter.get('/', async (req, res) => {
  try {
    const centers = await Center.find().sort({ createdAt: -1 });
    res.json({ success: true, count: centers.length, centers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST add new center (Admin authenticated)
centersRouter.post('/', verifyToken, async (req, res) => {
  try {
    const { city, area, state, address, phone, timing, status, dailyCapacity } = req.body;
    if (!city || !area || !address) {
      return res.status(400).json({ success: false, message: 'City, area, and address are required' });
    }

    const uniqueId = 'tc-' + Date.now();
    const newCenter = new Center({
      id: uniqueId,
      city,
      area,
      state: state || 'India',
      address,
      phone: phone || '+91 1800 419 5278',
      timing: timing || 'Mon–Sat: 8:00 AM – 5:00 PM',
      status: status || 'Active · 100% Free Daily Therapy',
      dailyCapacity: dailyCapacity || '120+ Patients/Day'
    });

    const saved = await newCenter.save();
    res.status(201).json({ success: true, message: 'Therapy center added successfully', center: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add center', error: err.message });
  }
});

// PUT update center (Admin authenticated)
centersRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Center.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Therapy center not found' });
    }
    res.json({ success: true, message: 'Therapy center updated successfully', center: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update center', error: err.message });
  }
});

// DELETE remove center (Admin authenticated)
centersRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Center.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Therapy center not found' });
    }
    res.json({ success: true, message: 'Therapy center deleted successfully', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete center', error: err.message });
  }
});

export default centersRouter;
