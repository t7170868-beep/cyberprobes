import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log(`🔍 Production login attempt for: ${email}`);

    // Hardcoded production check
    if (email === 'admin@cyberprobes.com' && password === 'admin123') {
      console.log(`✅ Production authentication successful for: ${email}`);
      
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
    console.error('❌ Production login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
