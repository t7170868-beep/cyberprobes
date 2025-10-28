import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log(`🔍 Simple login attempt for: ${email}`);

    // Simple hardcoded check for now
    if (email === 'admin@cyberprobes.com' && password === 'admin123') {
      console.log(`✅ Simple authentication successful for: ${email}`);
      
      return NextResponse.json({
        id: 'admin-user-id',
        email: 'admin@cyberprobes.com',
        name: 'Admin User',
        role: 'ADMIN'
      });
    }

    console.log(`❌ Invalid credentials for: ${email}`);
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('❌ Simple login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}