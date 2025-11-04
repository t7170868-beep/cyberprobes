import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ enrolled: false });
    }

    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ enrolled: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ enrolled: false });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
      include: {
        payment: true,
      },
    });

    // Check if payment is completed (for paid courses)
    const isEnrolled = enrollment && (
      enrollment.payment?.status === 'completed' || 
      enrollment.payment?.status === 'pending' // Allow pending payments to access
    );

    return NextResponse.json({ enrolled: !!isEnrolled, enrollment });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return NextResponse.json({ enrolled: false });
  }
}

