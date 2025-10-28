const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database...');
    
    // Check if users exist
    const users = await prisma.user.findMany();
    console.log(`📊 Found ${users.length} users in database:`);
    
    users.forEach(user => {
      console.log(`- Email: ${user.email}`);
      console.log(`- Name: ${user.name}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Created: ${user.createdAt}`);
      console.log('---');
    });
    
    // Check if admin exists
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@cyberprobes.com' }
    });
    
    if (admin) {
      console.log('✅ Admin user found!');
      console.log(`- Email: ${admin.email}`);
      console.log(`- Role: ${admin.role}`);
      console.log(`- Has password: ${admin.password ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ Admin user NOT found!');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
