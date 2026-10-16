import express from 'express';
import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';
import { verifyToken } from './auth.js';

export const testimonialsRouter = express.Router();

// GET all testimonials
testimonialsRouter.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST add new testimonial (Admin authenticated)
testimonialsRouter.post('/', verifyToken, async (req, res) => {
  try {
    const {
      name,
      age,
      location,
      disease,
      diseaseKo,
      duration,
      treatment,
      image,
      rating,
      quote,
      fullStory
    } = req.body;

    if (!name || !quote) {
      return res.status(400).json({ success: false, message: 'Patient name and recovery quote are required' });
    }

    const uniqueId = 'p' + Date.now();
    const newTestimonial = new Testimonial({
      id: uniqueId,
      name,
      age: age || '50 Years',
      location: location || 'Bhubaneswar, Odisha',
      disease: disease || 'Chronic Pain Relief',
      diseaseKo: diseaseKo || '',
      duration: duration || 'Suffering for 3 Years',
      treatment: treatment || 'BEDRO Smart-1 & Taeyangsuk Mat',
      image: image || '/assets/testimonials/patient-kmamari-sahoo.jpg',
      rating: Number(rating) || 5,
      docPage: 14,
      quote,
      fullStory: fullStory || quote
    });

    const saved = await newTestimonial.save();
    res.status(201).json({ success: true, message: 'Patient testimonial added successfully to website', testimonial: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add testimonial', error: err.message });
  }
});

// PUT update testimonial (Admin authenticated)
testimonialsRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };
    const updated = await Testimonial.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    console.log(`[MongoDB Atlas] Testimonial "${updated.name}" (${updated.id}) updated successfully.`);
    res.json({ success: true, message: 'Testimonial updated successfully in MongoDB', testimonial: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial', error: err.message });
  }
});

// DELETE remove testimonial (Admin authenticated)
testimonialsRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };
    const deleted = await Testimonial.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: `Patient testimonial "${idParam}" not found in database` });
    }
    console.log(`[MongoDB Atlas] Testimonial "${deleted.name}" (${deleted.id}) deleted successfully.`);
    res.json({ 
      success: true, 
      message: `Patient testimonial from "${deleted.name}" deleted from MongoDB Atlas database successfully`, 
      deletedId: idParam,
      testimonial: deleted 
    });
  } catch (err) {
    console.error('Delete testimonial error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete testimonial from database', error: err.message });
  }
});

export default testimonialsRouter;
