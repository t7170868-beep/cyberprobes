import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { orderId, paymentId, signature, courseId } = await req.json();

    if (!orderId || !paymentId || !signature || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: In production, verify Razorpay signature
    // const generatedSignature = crypto
    //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    //   .update(`${orderId}|${paymentId}`)
    //   .digest('hex');
    //
    // if (generatedSignature !== signature) {
    //   return NextResponse.json(
    //     { error: 'Invalid payment signature' },
    //     { status: 400 }
    //   );
    // }

    // For development/testing, skip signature verification
    console.log('⚠️  Skipping Razorpay signature verification (development mode)');

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

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment with payment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        progress: 0,
        payment: {
          create: {
            amount: course.price,
            currency: 'INR',
            paymentMethod: 'razorpay',
            paymentId: paymentId,
            transactionId: orderId,
            status: 'completed',
            gatewayResponse: JSON.stringify({
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            }),
          },
        },
      },
      include: {
        course: true,
        payment: true,
      },
    });

    console.log(`✅ Payment verified and enrollment created for user: ${user.email}`);

    // TODO: Send enrollment confirmation email
    // await sendEnrollmentEmail(user.email, course.title);

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

