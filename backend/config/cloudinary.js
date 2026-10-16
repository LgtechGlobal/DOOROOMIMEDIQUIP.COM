import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'lgtechglobal',
  api_key: process.env.CLOUDINARY_API_KEY || '411327479788138',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'kXIBIICH2iLD8H0dshUn0tquGbc',
  secure: true
});

export default cloudinary;
