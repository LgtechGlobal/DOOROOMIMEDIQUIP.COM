import express from 'express';
import { GalleryItem } from '../models/GalleryItem.js';
import { verifyToken } from './auth.js';

export const galleryRouter = express.Router();

// GET all gallery items (supports optional ?type=image or ?type=video query)
galleryRouter.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type && ['image', 'video'].includes(req.query.type)) {
      filter.type = req.query.type;
    }
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }

    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery items',
      error: err.message
    });
  }
});

// POST add new gallery item (image or video) - Admin protected
galleryRouter.post('/', verifyToken, async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      category,
      url,
      thumbnailUrl,
      videoType
    } = req.body;

    if (!type || !['image', 'video'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Valid media type is required (either "image" or "video")'
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!url || !url.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Media URL or file is required'
      });
    }

    // Auto-detect videoType if not provided
    let detectedVideoType = videoType || 'file';
    if (type === 'video') {
      const lowerUrl = url.toLowerCase();
      if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
        detectedVideoType = 'youtube';
      } else if (lowerUrl.includes('vimeo.com')) {
        detectedVideoType = 'vimeo';
      }
    }

    const uniqueId = `gal_${type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newItem = new GalleryItem({
      id: uniqueId,
      type,
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category ? category.trim() : 'General',
      url: url.trim(),
      thumbnailUrl: thumbnailUrl ? thumbnailUrl.trim() : '',
      videoType: detectedVideoType
    });

    const saved = await newItem.save();
    res.status(201).json({
      success: true,
      message: `${type === 'image' ? 'Image' : 'Video'} successfully added to gallery`,
      item: saved
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add gallery item',
      error: err.message
    });
  }
});

// PUT update gallery item - Admin protected
galleryRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      url,
      thumbnailUrl,
      videoType
    } = req.body;

    const query = { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }].filter(q => Object.values(q)[0] !== null) };
    const item = await GalleryItem.findOne(query);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    if (title !== undefined) item.title = title.trim();
    if (description !== undefined) item.description = description.trim();
    if (category !== undefined) item.category = category.trim();
    if (url !== undefined) item.url = url.trim();
    if (thumbnailUrl !== undefined) item.thumbnailUrl = thumbnailUrl.trim();
    if (videoType !== undefined) item.videoType = videoType;
    item.updatedAt = new Date();

    const updated = await item.save();
    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      item: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update gallery item',
      error: err.message
    });
  }
});

// DELETE gallery item - Admin protected
galleryRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }].filter(q => Object.values(q)[0] !== null) };
    const deleted = await GalleryItem.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.json({
      success: true,
      message: 'Gallery item successfully deleted',
      deletedId: id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item',
      error: err.message
    });
  }
});
