'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for courses
const coursesData = [
  {
    id: '1',
    title: 'Introduction to Cyber Security',
    description: 'Learn the fundamentals of cyber security, including threat identification, risk assessment, and basic protection strategies.',
    slug: 'intro-to-cyber-security',
    published: true,
    materials: [
      {
        id: '1',
        title: 'Course Introduction',
        type: 'VIDEO',
        url: 'https://www.youtube.com/embed/inWWhr5tnEA'
      },
      {
        id: '2',
        title: 'Cyber Security Basics',
        type: 'PDF',
        url: '/documents/cyber-security-basics.pdf'
      },
      {
        id: '3',
        title: 'Threat Assessment',
        type: 'VIDEO',
        url: 'https://www.youtube.com/embed/Dk-ZqQ-bfy4'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Network Security',
    description: 'Dive deep into network security protocols, firewall configuration, intrusion detection systems, and secure network design.',
    slug: 'advanced-network-security',
    published: true,
    materials: [
      {
        id: '1',
        title: 'Network Security Overview',
        type: 'VIDEO',
        url: 'https://www.youtube.com/embed/PYXdlQwkRrI'
      },
      {
        id: '2',
        title: 'Firewall Configuration Guide',
        type: 'PDF',
        url: '/documents/firewall-config-guide.pdf'
      }
    ]
  },
  {
    id: '3',
    title: 'Digital Forensics Fundamentals',
    description: 'Learn the basics of digital forensics, including evidence collection, preservation, analysis, and reporting.',
    slug: 'digital-forensics-fundamentals',
    published: true,
    materials: [
      {
        id: '1',
        title: 'Introduction to Digital Forensics',
        type: 'VIDEO',
        url: 'https://www.youtube.com/embed/inWWhr5tnEA'
      },
      {
        id: '2',
        title: 'Evidence Collection Guidelines',
        type: 'PDF',
        url: '/documents/evidence-collection.pdf'
      }
    ]
  }
];

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/courses/' + params.slug);
      return;
    }

    // In a real application, you would fetch the course from an API
    // For now, we'll use the mock data
    const foundCourse = coursesData.find(c => c.slug === params.slug);
    
    if (foundCourse) {
      setCourse(foundCourse);
    }
    
    setIsLoading(false);
  }, [params.slug, router, status]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/courses"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        &larr; Back to All Courses
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-gray-200">{course.description}</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Course Materials</h2>
          
          <div className="space-y-6">
            {course.materials.map((material: any) => (
              <div key={material.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-xl font-medium mb-2">{material.title}</h3>
                
                {material.type === 'VIDEO' && (
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md mb-4">
                    <iframe 
                      src={material.url} 
                      className="absolute top-0 left-0 w-full h-full" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                
                {material.type === 'PDF' && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Download PDF
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 