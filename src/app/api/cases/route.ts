import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/cases - Get all cases for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For admin users, return all cases. For regular users, return only their cases
    const whereClause = session.user.role === 'ADMIN' 
      ? {} 
      : { clientEmail: session.user.email || '' };

    const cases = await prisma.case.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        evidenceFiles: true
      }
    });

    return NextResponse.json(cases);
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch cases' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      priority,
      incidentType,
      contactPerson,
      contactEmail,
      contactPhone,
      urgency,
      confidentialityLevel,
      files
    } = body;

    // Validate required fields
    if (!title || !description || !incidentType || !contactPerson || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate case number atomically using transaction to prevent race conditions
    const currentYear = new Date().getFullYear();
    
    // Use transaction to ensure atomic case number generation
    const newCase = await prisma.$transaction(async (tx) => {
      // Get current count and increment atomically
      const caseCount = await tx.case.count({
        where: {
          caseNumber: {
            startsWith: `CF-${currentYear}-`
          }
        }
      });
      
      const caseNumber = `CF-${currentYear}-${String(caseCount + 1).padStart(3, '0')}`;

      // Create case
      const createdCase = await tx.case.create({
        data: {
          caseNumber,
          title,
          description,
          priority: priority || 'MEDIUM',
          incidentType,
          contactPerson,
          contactEmail,
          contactPhone,
          urgency: urgency || false,
          confidentialityLevel: confidentialityLevel || 'STANDARD',
          status: 'SUBMITTED',
          clientEmail: session.user.email || contactEmail,
          assignedAnalyst: 'Auto-Assignment Pending',
          estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }
      });

      // Create evidence files if provided
      if (files && files.length > 0) {
        const evidenceFiles = files.map((file: any) => ({
          caseId: createdCase.id,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          checksum: file.checksum,
          uploadPath: `/uploads/cases/${createdCase.caseNumber}/${file.name}`,
        }));

        await tx.evidenceFile.createMany({
          data: evidenceFiles
        });
      }

      return createdCase;
    });

    // Send notification (simulate)
    // Case created successfully - notification would be sent here

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to create case' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
