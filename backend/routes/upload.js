import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import cloudinary from '../config/cloudinary.js';
import { Product } from '../models/Product.js';
import { Testimonial } from '../models/Testimonial.js';
import { Ad } from '../models/Ad.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadRouter = express.Router();

// Configure Multer for in-memory storage (up to 100MB for media/video)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

// Helper: optimize image buffer with sharp if larger than 2MB or high-res
const optimizeBufferIfNeeded = async (buffer) => {
  try {
    const metadata = await sharp(buffer).metadata();
    let transformer = sharp(buffer);

    if (metadata.width && metadata.width > 2200) {
      transformer = transformer.resize({ width: 2200, withoutEnlargement: true });
    }

    if (buffer.length > 2 * 1024 * 1024 || (metadata.width && metadata.width > 2000)) {
      if (metadata.format === 'png') {
        transformer = transformer.png({ quality: 85, compressionLevel: 8 });
      } else if (metadata.format === 'webp') {
        transformer = transformer.webp({ quality: 85 });
      } else {
        transformer = transformer.jpeg({ quality: 85, mozjpeg: true });
      }
      return await transformer.toBuffer();
    }
    return buffer;
  } catch (err) {
    // If sharp fails to process (e.g. svg, video, or non-image), return original buffer
    return buffer;
  }
};

// Helper: upload a buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'dooroomi_mediquip',
        resource_type: 'auto',
        ...options
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// GET /api/upload/status - Health & connectivity of Cloudinary
uploadRouter.get('/status', async (req, res) => {
  try {
    const ping = await cloudinary.api.ping();
    res.json({
      success: true,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'lgtechglobal',
      status: ping.status,
      apiKey: (process.env.CLOUDINARY_API_KEY || '').slice(0, 4) + '...' + (process.env.CLOUDINARY_API_KEY || '').slice(-4),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// POST /api/upload - Upload an image or video file or remote URL to Cloudinary
uploadRouter.post('/', upload.any(), async (req, res) => {
  try {
    const uploadedFile = (req.files && req.files.length > 0) ? req.files[0] : req.file;

    // 1. Direct file upload from multipart form-data
    if (uploadedFile) {
      const isVideo = uploadedFile.mimetype && uploadedFile.mimetype.startsWith('video/');
      let bufferToUpload = uploadedFile.buffer;

      if (!isVideo) {
        bufferToUpload = await optimizeBufferIfNeeded(uploadedFile.buffer);
      }

      const prefix = isVideo ? 'vid' : 'img';
      const fileOpts = isVideo
        ? { resource_type: 'video', folder: 'dooroomi_mediquip/videos' }
        : { resource_type: 'image', folder: 'dooroomi_mediquip' };

      const result = await uploadBufferToCloudinary(bufferToUpload, {
        public_id: `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        ...fileOpts
      });

      return res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        resource_type: isVideo ? 'video' : 'image'
      });
    }

    // 2. Base64 data string or remote URL in JSON body
    const { image, video, url } = req.body;
    const target = image || video || url;

    if (!target) {
      return res.status(400).json({
        success: false,
        error: 'No file or media URL provided'
      });
    }

    // If base64 data URI (image)
    if (typeof target === 'string' && target.startsWith('data:image/')) {
      const base64Data = target.split(';base64,').pop();
      const rawBuffer = Buffer.from(base64Data, 'base64');
      const optimized = await optimizeBufferIfNeeded(rawBuffer);
      const result = await uploadBufferToCloudinary(optimized, {
        public_id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        resource_type: 'image'
      });

      return res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        resource_type: 'image'
      });
    }

    // If remote URL
    const result = await cloudinary.uploader.upload(target, {
      folder: 'dooroomi_mediquip',
      resource_type: 'auto'
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      resource_type: result.resource_type || 'image'
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Media upload to Cloudinary failed'
    });
  }
});

// Helper to resolve local assets path on disk
const resolveLocalAsset = (relPath) => {
  if (!relPath || typeof relPath !== 'string') return null;
  let cleaned = relPath.replace(/^(\.\/|\/)/, '');
  const candidates = [
    path.join(__dirname, '../../frontend/public', cleaned),
    path.join(__dirname, '../../frontend/dist', cleaned),
    path.join(__dirname, '../../frontend', cleaned)
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) {
      return c;
    }
  }
  return null;
};

// POST /api/upload/migrate-all - Migrate all local product, testimonial, and ad images to Cloudinary
uploadRouter.post('/migrate-all', async (req, res) => {
  try {
    const results = {
      productsUpdated: 0,
      testimonialsUpdated: 0,
      adsUpdated: 0,
      errors: []
    };

    // 1. Migrate Products
    const products = await Product.find();
    for (const prod of products) {
      const img = prod.imgUrl;
      if (img && img.includes('cloudinary.com')) continue;

      const localFile = resolveLocalAsset(img);
      if (localFile) {
        try {
          const rawBuffer = fs.readFileSync(localFile);
          const optimized = await optimizeBufferIfNeeded(rawBuffer);
          const uploadRes = await uploadBufferToCloudinary(optimized, {
            folder: 'dooroomi_mediquip/products'
          });
          prod.imgUrl = uploadRes.secure_url;
          await prod.save();
          results.productsUpdated++;
        } catch (e) {
          results.errors.push(`Product ${prod.name || prod.id}: ${e.message}`);
        }
      }
    }

    // 2. Migrate Testimonials
    const testimonials = await Testimonial.find();
    for (const test of testimonials) {
      const img = test.image;
      if (img && img.includes('cloudinary.com')) continue;

      const localFile = resolveLocalAsset(img);
      if (localFile) {
        try {
          const rawBuffer = fs.readFileSync(localFile);
          const optimized = await optimizeBufferIfNeeded(rawBuffer);
          const uploadRes = await uploadBufferToCloudinary(optimized, {
            folder: 'dooroomi_mediquip/testimonials'
          });
          test.image = uploadRes.secure_url;
          await test.save();
          results.testimonialsUpdated++;
        } catch (e) {
          results.errors.push(`Testimonial ${test.name}: ${e.message}`);
        }
      }
    }

    // 3. Migrate Ads
    const ads = await Ad.find();
    for (const ad of ads) {
      const img = ad.imageUrl;
      if (img && img.includes('cloudinary.com')) continue;

      const localFile = resolveLocalAsset(img);
      if (localFile) {
        try {
          const rawBuffer = fs.readFileSync(localFile);
          const optimized = await optimizeBufferIfNeeded(rawBuffer);
          const uploadRes = await uploadBufferToCloudinary(optimized, {
            folder: 'dooroomi_mediquip/ads'
          });
          ad.imageUrl = uploadRes.secure_url;
          await ad.save();
          results.adsUpdated++;
        } catch (e) {
          results.errors.push(`Ad ${ad.title}: ${e.message}`);
        }
      }
    }

    res.json({
      success: true,
      message: 'Cloudinary migration complete',
      results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});
