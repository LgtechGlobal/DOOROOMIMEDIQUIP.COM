import express from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { verifyToken } from './auth.js';

export const productsRouter = express.Router();

// GET all products
productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET single product by id or slug
productsRouter.get('/:idOrSlug', async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [{ id: req.params.idOrSlug }, { slug: req.params.idOrSlug }]
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST add new product (Admin authenticated)
productsRouter.post('/', verifyToken, async (req, res) => {
  try {
    const {
      name,
      nameKo,
      cat,
      catLabel,
      model,
      short,
      desc,
      volume,
      texture,
      badge,
      imgUrl,
      keyActives,
      specs
    } = req.body;

    if (!name || !imgUrl) {
      return res.status(400).json({ success: false, message: 'Name and image URL are required' });
    }

    const uniqueId = 'p-' + Date.now();
    const slug = (name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const newProduct = new Product({
      id: uniqueId,
      slug,
      name,
      nameKo: nameKo || '',
      cat: cat || 'series-a',
      catLabel: catLabel || 'Therapeutic Medical Systems',
      model: model || 'DM-M' + Math.floor(100 + Math.random() * 900),
      short: short || name,
      desc: desc || name,
      volume: volume || 'Medical Grade',
      texture: texture || 'Precision Ergonomic',
      badge: badge || 'Medical Grade',
      imgUrl,
      keyActives: Array.isArray(keyActives) ? keyActives : (keyActives ? keyActives.split(',').map(s => s.trim()) : []),
      specs: Array.isArray(specs) ? specs : [
        ['Model Code', model || 'DM-M100'],
        ['Standard Compliance', 'ISO 22716 / Korea CGMP / Medical CE']
      ]
    });

    const saved = await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully to website', product: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add product', error: err.message });
  }
});

// PUT update product (Admin authenticated)
productsRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        { slug: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };
    const updated = await Product.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log(`[MongoDB Atlas] Product "${updated.name}" (${updated.id}) updated successfully.`);
    res.json({ success: true, message: 'Product updated successfully in MongoDB', product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: err.message });
  }
});

// DELETE remove product (Admin authenticated)
productsRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const idParam = req.params.id;
    const query = {
      $or: [
        { id: idParam },
        { slug: idParam },
        ...(mongoose.Types.ObjectId.isValid(idParam) ? [{ _id: idParam }] : [])
      ]
    };
    const deleted = await Product.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: `Product "${idParam}" not found in MongoDB database` });
    }
    console.log(`[MongoDB Atlas] Product "${deleted.name}" (${deleted.id}) deleted successfully.`);
    res.json({ 
      success: true, 
      message: `Product "${deleted.name}" deleted from MongoDB Atlas database successfully`, 
      deletedId: idParam,
      product: deleted 
    });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete product from database', error: err.message });
  }
});

export default productsRouter;
