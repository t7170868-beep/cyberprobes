import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/payments/create - Create payment order (Razorpay)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    if (course.price === 0) {
      return NextResponse.json(
        { error: 'This is a free course. Use enrollment API instead.' },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment with pending payment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        amount: course.price,
        currency: 'INR',
        paymentMethod: 'razorpay',
        status: 'pending',
      },
    });

    // Generate Razorpay order (you'll need to install razorpay: npm install razorpay)
    // For now, return payment details - integrate Razorpay SDK here
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    
    if (!razorpayKeyId) {
      // Fallback: return payment ID for manual processing
      return NextResponse.json({
        paymentId: payment.id,
        enrollmentId: enrollment.id,
        amount: course.price,
        currency: 'INR',
        courseTitle: course.title,
        message: 'Razorpay not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env',
      });
    }

    // TODO: Integrate Razorpay SDK
    // const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    // 
    // const order = await razorpay.orders.create({
    //   amount: course.price * 100, // Convert to paise
    //   currency: 'INR',
    //   receipt: payment.id,
    //   notes: {
    //     courseId: course.id,
    //     userId: user.id,
    //   },
    // });

    return NextResponse.json({
      paymentId: payment.id,
      enrollmentId: enrollment.id,
      amount: course.price,
      currency: 'INR',
      courseTitle: course.title,
      razorpayKeyId,
      // orderId: order.id, // Uncomment when Razorpay is integrated
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}

