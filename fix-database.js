const { PrismaClient } = require('@prisma/client');

async function fixDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking current database state...');
    
    // Check users
    const users = await prisma.user.findMany();
    console.log(`📊 Found ${users.length} users:`);
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });
    
    // Check if admin exists
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@cyberprobes.com' }
    });
    
    if (admin) {
      console.log('✅ Admin user exists!');
      console.log(`- Email: ${admin.email}`);
      console.log(`- Role: ${admin.role}`);
      console.log(`- Has password: ${admin.password ? 'Yes' : 'No'}`);
      
      // Test password
      const bcrypt = require('bcrypt');
      const isPasswordValid = await bcrypt.compare('admin123', admin.password);
      console.log(`- Password 'admin123' valid: ${isPasswordValid ? 'Yes' : 'No'}`);
      
    } else {
      console.log('❌ Admin user NOT found! Creating...');
      
      // Create admin user
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@cyberprobes.com',
          password: hashedPassword,
          role: 'ADMIN',
        }
      });
      
      console.log('✅ Admin user created!');
      console.log(`- Email: ${newAdmin.email}`);
      console.log(`- Role: ${newAdmin.role}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase();
