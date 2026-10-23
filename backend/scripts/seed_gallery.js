import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GalleryItem } from '../models/GalleryItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI || 'mongodb+srv://gumansinghlgtechglobal_db_user:0bYvMxMPPaVvTm1l@dooroomimediquip.72damgv.mongodb.net/dooroomimediquip?retryWrites=true&w=majority';

// Read items from frontend/src/data/galleryData.js
const galleryDataRaw = fs.readFileSync(path.join(__dirname, '../../frontend/src/data/galleryData.js'), 'utf8');
const jsonMatch = galleryDataRaw.match(/INITIAL_GALLERY_ITEMS\s*=\s*(\[[\s\S]*?\]);/);

if (!jsonMatch) {
  console.error('Could not parse INITIAL_GALLERY_ITEMS from galleryData.js');
  process.exit(1);
}

const items = JSON.parse(jsonMatch[1]);
console.log(`Found ${items.length} items to seed into MongoDB GalleryItem collection.`);

async function seed() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB Atlas');

    // Remove old items to ensure clean state with new media
    await GalleryItem.deleteMany({});
    console.log('Cleared existing GalleryItems');

    // Insert all 59 items
    const inserted = await GalleryItem.insertMany(items);
    console.log(`Successfully seeded ${inserted.length} items into MongoDB Atlas.`);

    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
  } catch (err) {
    console.error('Failed to seed gallery items:', err);
    process.exit(1);
  }
}

seed();
