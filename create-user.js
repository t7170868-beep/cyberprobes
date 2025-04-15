// We need to use CommonJS require since this is a Node.js script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// Create a new PrismaClient instance for this script
const prisma = new PrismaClient();

async function main() {
  try {
    // Hash the password
    const password = await bcrypt.hash('test123', 10);
    
    // Create a test admin user
    const user = await prisma.user.upsert({
      where: { email: 'admin@cyberprobes.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@cyberprobes.com',
        password: password,
        role: 'ADMIN'
      }
    });
    
    console.log('Created test user:', user);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 