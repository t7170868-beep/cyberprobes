import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  let mongoClient: MongoClient | null = null;

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error('DATABASE_URL is not defined');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    console.log(`🔌 Connecting to MongoDB for user: ${email}`);

    // Connect to MongoDB directly
    mongoClient = new MongoClient(databaseUrl);
    await mongoClient.connect();

    const db = mongoClient.db('cyberprobes');
    const usersCollection = db.collection('User');

    // Find user
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.password) {
      console.log(`❌ No password set for user: ${email}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`❌ Invalid password for user: ${email}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log(`✅ Authentication successful for: ${email}`);

    // Return user data
    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('❌ Validation error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

