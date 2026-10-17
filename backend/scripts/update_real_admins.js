import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const coll = mongoose.connection.db.collection('admins');

  // Update dooroomi with real email and name
  await coll.updateOne(
    { username: 'dooroomi' },
    { $set: { email: 'dooroomimediquip@gmail.com', name: 'Dooroomi Global Administrator', role: 'superadmin', updatedAt: new Date() } }
  );

  const realAdmins = [
    {
      username: 'dooroomi',
      email: 'dooroomimediquip@gmail.com',
      name: 'Dooroomi Global Administrator',
      role: 'superadmin',
      password: 'dooroomi@123',
      lastLogin: new Date()
    },
    {
      username: 'manas_gumansingh',
      email: 'gumansingh.oditechglobal@gmail.com',
      name: 'Manas Kumar Gumansingh',
      role: 'admin',
      password: 'dooroomi@123',
      lastLogin: new Date()
    },
    {
      username: 'dooroomi_executive',
      email: 'admin@dooroomimediquip.com',
      name: 'Dooroomi Executive Operations',
      role: 'admin',
      password: 'dooroomi@123',
      lastLogin: new Date()
    },
    {
      username: 'lgtech_admin',
      email: 'lgtechglobal@gmail.com',
      name: 'LG Tech Global Admin',
      role: 'admin',
      password: 'dooroomi@123',
      lastLogin: new Date()
    },
    {
      username: 'debendra_rao',
      email: 'ceo@oditechglobal.com',
      name: 'Debendra Rao',
      role: 'admin',
      password: 'dooroomi@123',
      lastLogin: new Date()
    }
  ];

  for (const r of realAdmins) {
    const existing = await coll.findOne({ email: r.email });
    if (existing) {
      await coll.updateOne({ email: r.email }, { $set: { name: r.name, role: r.role } });
    } else {
      await coll.insertOne({ ...r, createdAt: new Date(), updatedAt: new Date() });
    }
  }

  // Remove test placeholder accounts from initial mockup
  await coll.deleteMany({ email: { $in: ['deb@gmail.com', 'oditechofficial@gmail.com', 'gumansingh.oditech@gmail.com'] } });

  const current = await coll.find({}).toArray();
  console.log('Updated real admins in MongoDB:');
  console.log(JSON.stringify(current.map(c => ({ id: c._id, username: c.username, email: c.email, name: c.name, role: c.role })), null, 2));
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
