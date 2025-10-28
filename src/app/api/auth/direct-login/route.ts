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

    console.log(`🔍 Direct login attempt for: ${email}`);

    // Hardcoded production MongoDB URL
    const databaseUrl = "mongodb+srv://t7170868_db_user:admin123@cluster0.pnugpz0.mongodb.net/cyberprobes?retryWrites=true&w=majority";

    // Connect to MongoDB directly
    mongoClient = new MongoClient(databaseUrl);
    await mongoClient.connect();

    const db = mongoClient.db('cyberprobes');
    
    // Try both collection names
    let usersCollection = db.collection('user');
    let user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    });

    // If not found in 'user', try 'User'
    if (!user) {
      usersCollection = db.collection('User');
      user = await usersCollection.findOne({ 
        email: email.toLowerCase().trim() 
      });
    }

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

    console.log(`✅ Direct authentication successful for: ${email}`);

    // Return user data
    return NextResponse.json({
      id: user._id?.toString() || user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('❌ Direct login error:', error);
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
