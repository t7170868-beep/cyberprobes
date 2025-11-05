import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@cyberprobes.com' }
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@cyberprobes.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
    }

    // Check if sample data already exists
    const existingCourses = await prisma.course.count();
    
    if (existingCourses === 0) {
      // Create sample courses
      await prisma.course.createMany({
        data: [
          {
            title: 'Digital Forensics Fundamentals',
            description: 'Learn the basics of digital forensics, evidence collection, and analysis techniques used in cybercrime investigations.',
            slug: 'digital-forensics-fundamentals',
            category: 'Digital Forensics',
            level: 'Beginner',
            duration: '8 Weeks',
            price: 4999,
            instructor: 'Dr. Rajesh Kumar',
            published: true,
          },
          {
            title: 'Advanced Penetration Testing',
            description: 'Master advanced penetration testing techniques, exploit development, and vulnerability assessment methodologies.',
            slug: 'advanced-penetration-testing',
            category: 'Ethical Hacking',
            level: 'Advanced',
            duration: '12 Weeks',
            price: 7999,
            instructor: 'Priya Sharma',
            published: true,
          },
          {
            title: 'Incident Response & Threat Hunting',
            description: 'Comprehensive training on incident response procedures, threat hunting, and malware analysis.',
            slug: 'incident-response-threat-hunting',
            category: 'Cybersecurity',
            level: 'Intermediate',
            duration: '10 Weeks',
            price: 5999,
            instructor: 'Amit Verma',
            published: true,
          },
        ],
      });

      // Create sample blogs
      await prisma.blog.createMany({
        data: [
          {
            title: 'Understanding Ransomware Attacks',
            content: 'Ransomware attacks have become increasingly sophisticated. Learn how to protect your organization from these threats...',
            slug: 'understanding-ransomware-attacks',
            published: true,
          },
          {
            title: 'Top 10 Cybersecurity Best Practices',
            content: 'Implementing these cybersecurity best practices can significantly reduce your risk of a data breach...',
            slug: 'top-10-cybersecurity-best-practices',
            published: true,
          },
          {
            title: 'Digital Forensics in Cloud Environments',
            content: 'Cloud forensics presents unique challenges. This guide covers the essential techniques and tools...',
            slug: 'digital-forensics-cloud-environments',
            published: true,
          },
        ],
      });

      // Create sample videos
      await prisma.video.createMany({
        data: [
          {
            title: 'Introduction to Cybersecurity',
            description: 'A comprehensive introduction to cybersecurity concepts and practices.',
            url: 'https://www.youtube.com/watch?v=example1',
            published: true,
          },
          {
            title: 'Network Security Fundamentals',
            description: 'Learn the basics of network security and common attack vectors.',
            url: 'https://www.youtube.com/watch?v=example2',
            published: true,
          },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Production database seeded successfully!',
      data: {
        admin: existingAdmin ? 'Already exists' : 'Created',
        courses: existingCourses === 0 ? 'Created 3 courses' : 'Already exist',
        blogs: existingCourses === 0 ? 'Created 3 blogs' : 'Already exist',
        videos: existingCourses === 0 ? 'Created 2 videos' : 'Already exist',
      }
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

