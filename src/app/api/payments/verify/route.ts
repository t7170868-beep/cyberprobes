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

    // Verify Razorpay signature
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpaySecret) {
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // In production, always verify signature
    // In development, only skip if explicitly enabled via env var
    const skipVerification = process.env.NODE_ENV === 'development' && process.env.SKIP_PAYMENT_VERIFICATION === 'true';
    
    if (!skipVerification) {
      const generatedSignature = crypto
        .createHmac('sha256', razorpaySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      // Use timing-safe comparison to prevent timing attacks
      if (generatedSignature.length !== signature.length) {
        return NextResponse.json(
          { error: 'Invalid payment signature' },
          { status: 400 }
        );
      }

      let isValid = true;
      for (let i = 0; i < generatedSignature.length; i++) {
        isValid = isValid && generatedSignature[i] === signature[i];
      }

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid payment signature' },
          { status: 400 }
        );
      }
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

    // Create enrollment with payment atomically using transaction
    const enrollment = await prisma.$transaction(async (tx) => {
      // Double-check enrollment doesn't exist (race condition protection)
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
      });

      if (existingEnrollment) {
        throw new Error('Already enrolled in this course');
      }

      // Create enrollment with payment
      return await tx.enrollment.create({
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
    });

    // Payment verified and enrollment created successfully

    // TODO: Send enrollment confirmation email
    // await sendEnrollmentEmail(user.email, course.title);

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to verify payment' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

