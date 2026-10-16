import express from 'express';
import mongoose from 'mongoose';
import { Ad } from '../models/Ad.js';
import { verifyToken } from './auth.js';

export const adsRouter = express.Router();

// GET all ads (returns all ads or active ad for user)
adsRouter.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ priority: 1, createdAt: -1 });
    res.json({ success: true, count: ads.length, ads });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET active ad for website visitors (only if isEnabled === true)
adsRouter.get('/active', async (req, res) => {
  try {
    const activeAd = await Ad.findOne({ isEnabled: true }).sort({ priority: 1, updatedAt: -1 });
    res.json({ success: true, ad: activeAd || null });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST create a new ad (Admin only)
adsRouter.post('/', verifyToken, async (req, res) => {
  try {
    const {
      title,
      badge,
      subtitle,
      description,
      imageUrl,
      buttonText,
      buttonLink,
      buttonActionType,
      isEnabled,
      priority,
      discountTag
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Ad title is required' });
    }

    const newId = req.body.id || ('ad-' + Date.now());

    // If this ad is marked as enabled, optionally disable others to have one primary popup
    if (isEnabled) {
      await Ad.updateMany({}, { isEnabled: false });
    }

    const ad = new Ad({
      id: newId,
      title,
      badge: badge || 'SPECIAL ANNOUNCEMENT',
      subtitle: subtitle || '',
      description: description || '',
      imageUrl: imageUrl || '',
      buttonText: buttonText || 'Learn More',
      buttonLink: buttonLink || '#/therapy',
      buttonActionType: buttonActionType || 'link',
      isEnabled: isEnabled !== undefined ? isEnabled : true,
      priority: priority || 1,
      discountTag: discountTag || ''
    });

    await ad.save();
    res.status(201).json({ success: true, message: 'Ad created successfully', ad });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PUT update ad (Admin only)
adsRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const { isEnabled } = req.body;
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };

    // If enabling this ad, set other ads isEnabled to false so only one is active at a time
    if (isEnabled) {
      await Ad.updateMany({ id: { $ne: idParam } }, { isEnabled: false });
    }

    const updated = await Ad.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Ad not found' });
    }

    res.json({ success: true, message: 'Ad updated successfully', ad: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PATCH toggle isEnabled state (Admin only)
adsRouter.patch('/:id/toggle', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };

    const current = await Ad.findOne(query);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Ad not found' });
    }

    const newState = !current.isEnabled;
    if (newState) {
      // Disable others so only one is active
      await Ad.updateMany({ _id: { $ne: current._id } }, { isEnabled: false });
    }

    current.isEnabled = newState;
    await current.save();

    res.json({ success: true, message: `Ad ${newState ? 'enabled' : 'disabled'} successfully`, ad: current });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// DELETE ad (Admin only)
adsRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };
    const deleted = await Ad.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: `Ad "${idParam}" not found in database` });
    }
    console.log(`[MongoDB Atlas] Ad "${deleted.title}" (${deleted.id}) deleted successfully.`);
    res.json({ 
      success: true, 
      message: `Advertisement "${deleted.title}" deleted from MongoDB Atlas successfully`, 
      deletedId: idParam,
      ad: deleted 
    });
  } catch (err) {
    console.error('Delete ad error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});
