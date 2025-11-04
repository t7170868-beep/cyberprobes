import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// In production, install: npm install razorpay crypto
// For now, we'll create mock orders

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId, amount } = await req.json();

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: In production, initialize Razorpay and create order
    // const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const order = await razorpay.orders.create({
    //   amount: amount * 100, // Amount in paise
    //   currency: 'INR',
    //   receipt: `course_${courseId}_${Date.now()}`,
    //   notes: {
    //     courseId,
    //     userEmail: session.user.email,
    //   },
    // });

    // For now, return mock order
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      orderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

