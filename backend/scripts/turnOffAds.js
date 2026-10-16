import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB Atlas');
  
  const result = await mongoose.connection.db.collection('ads').updateMany({}, {
    $set: { isEnabled: false }
  });
  console.log(`Updated ${result.modifiedCount} ads to isEnabled: false`);

  const allAds = await mongoose.connection.db.collection('ads').find().toArray();
  for (const ad of allAds) {
    console.log(`Ad "${ad.title}" (id: ${ad.id}): isEnabled = ${ad.isEnabled}`);
  }
  
  await mongoose.disconnect();
  console.log('Done');
}

run().catch(console.error);
