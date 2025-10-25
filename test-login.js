// Test login locally to verify password
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const MONGODB_URI = 'mongodb+srv://t7170868_db_user:T0kdjFq0S1DGGi94@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority&appName=Cluster0';

async function testLogin() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db('cyberprobes');
    const usersCollection = db.collection('User');

    // Find admin user
    const user = await usersCollection.findOne({ 
      email: 'admin@cyberprobes.com' 
    });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }

    console.log('✅ User found!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`🔑 Role: ${user.role}`);
    console.log(`🔐 Password hash: ${user.password.substring(0, 30)}...`);

    // Test password
    const isPasswordValid = await bcrypt.compare('admin123', user.password);
    
    if (isPasswordValid) {
      console.log('✅ Password "admin123" is CORRECT!');
    } else {
      console.log('❌ Password "admin123" is INCORRECT!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testLogin();

