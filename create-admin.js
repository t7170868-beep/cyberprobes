// Run this script locally to create admin user in MongoDB Atlas
// Usage: node create-admin.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const MONGODB_URI = 'mongodb+srv://t7170868_db_user:T0kdjFq0S1DGGi94@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority&appName=Cluster0';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db('cyberprobes');
    const usersCollection = db.collection('User');

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ role: 'ADMIN' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`📧 Email: ${existingAdmin.email}`);
      return;
    }

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = {
      name: 'Admin User',
      email: 'admin@cyberprobes.com',
      password: hashedPassword,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(adminUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@cyberprobes.com');
    console.log('🔑 Password: admin123');
    console.log(`🆔 User ID: ${result.insertedId}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

createAdminUser();

