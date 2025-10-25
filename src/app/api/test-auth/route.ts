import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test environment variables
    const hasDbUrl = !!process.env.DATABASE_URL;
    const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
    const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
    
    // Test MongoDB connection
    let mongoStatus = 'Not tested';
    let mongoError = null;
    
    try {
      const { MongoClient } = require('mongodb');
      
      if (process.env.DATABASE_URL) {
        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        
        const db = client.db('cyberprobes');
        const usersCollection = db.collection('User');
        const userCount = await usersCollection.countDocuments();
        
        await client.close();
        
        mongoStatus = `Connected - ${userCount} users found`;
      }
    } catch (error) {
      mongoStatus = 'Failed';
      mongoError = error instanceof Error ? error.message : 'Unknown error';
    }

    return NextResponse.json({
      success: true,
      environment: {
        DATABASE_URL: hasDbUrl ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_SECRET: hasNextAuthSecret ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_URL: hasNextAuthUrl ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_URL_VALUE: process.env.NEXTAUTH_URL,
        NODE_ENV: process.env.NODE_ENV
      },
      mongodb: {
        status: mongoStatus,
        error: mongoError
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

