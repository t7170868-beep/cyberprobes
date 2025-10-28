// Create a simple test API to verify database connection
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function testLogin() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing login with Prisma...');
    
    // Find admin user
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@cyberprobes.com' }
    });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      return;
    }
    
    console.log('✅ Admin user found!');
    console.log(`- Email: ${admin.email}`);
    console.log(`- Role: ${admin.role}`);
    
    // Test password
    const isPasswordValid = await bcrypt.compare('admin123', admin.password);
    console.log(`- Password 'admin123' valid: ${isPasswordValid ? 'Yes' : 'No'}`);
    
    if (isPasswordValid) {
      console.log('🎉 LOGIN SHOULD WORK!');
      console.log('The issue is in the production API, not the database.');
    } else {
      console.log('❌ Password mismatch!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
