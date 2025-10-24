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
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
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

    // Generate case number
    const currentYear = new Date().getFullYear();
    const caseCount = await prisma.case.count({
      where: {
        caseNumber: {
          startsWith: `CF-${currentYear}-`
        }
      }
    });
    const caseNumber = `CF-${currentYear}-${String(caseCount + 1).padStart(3, '0')}`;

    // Create case
    const newCase = await prisma.case.create({
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
        caseId: newCase.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        checksum: file.checksum,
        uploadPath: `/uploads/cases/${newCase.caseNumber}/${file.name}`,
      }));

      await prisma.evidenceFile.createMany({
        data: evidenceFiles
      });
    }

    // Send notification (simulate)
    console.log(`New case submitted: ${caseNumber} by ${contactEmail}`);

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    );
  }
}
