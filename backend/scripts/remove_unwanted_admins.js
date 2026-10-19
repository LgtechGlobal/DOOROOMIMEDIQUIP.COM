import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');
    const coll = mongoose.connection.db.collection('admins');

    const emailsToRemove = [
      'gumansingh.oditechglobal@gmail.com',
      'ceo@oditechglobal.com',
      'admin@dooroomimediquip.com',
      'lgtechglobal@gmail.com',
      'deb@gmail.com',
      'oditechofficial@gmail.com',
      'gumansingh.oditech@gmail.com'
    ];

    const usernamesToRemove = [
      'manas_gumansingh',
      'debendra_rao',
      'dooroomi_executive',
      'lgtech_admin'
    ];

    const delResult = await coll.deleteMany({
      $or: [
        { email: { $in: emailsToRemove } },
        { username: { $in: usernamesToRemove } }
      ]
    });

    console.log(`Successfully deleted ${delResult.deletedCount} unwanted administrator account(s).`);

    // Ensure only official Dooroomi Global Administrator exists
    const rootAdmin = await coll.findOne({
      $or: [
        { username: 'dooroomi' },
        { email: 'dooroomimediquip@gmail.com' }
      ]
    });

    if (!rootAdmin) {
      await coll.insertOne({
        username: 'dooroomi',
        email: 'dooroomimediquip@gmail.com',
        name: 'Dooroomi Global Administrator',
        role: 'superadmin',
        password: process.env.ADMIN_PASSWORD || 'dooroomi@123',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date()
      });
      console.log('Created Dooroomi Global Administrator.');
    } else {
      await coll.updateOne(
        { _id: rootAdmin._id },
        {
          $set: {
            username: 'dooroomi',
            email: 'dooroomimediquip@gmail.com',
            name: 'Dooroomi Global Administrator',
            role: 'superadmin'
          }
        }
      );
      console.log('Updated Dooroomi Global Administrator.');
    }

    const remaining = await coll.find({}).toArray();
    console.log('Current remaining administrators in MongoDB:');
    remaining.forEach(a => {
      console.log(`• [${a.role}] ${a.name} (${a.email}) - username: ${a.username}`);
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Error running script:', err);
    process.exit(1);
  }
}

run();
