'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for courses
const coursesData = [
  {
    id: '1',
    title: 'Introduction to Cyber Security',
    description: 'Learn the fundamentals of cyber security, including threat identification, risk assessment, and basic protection strategies.',
    slug: 'intro-to-cyber-security',
    image: '/images/course1.jpg',
    published: true
  },
  {
    id: '2',
    title: 'Advanced Network Security',
    description: 'Dive deep into network security protocols, firewall configuration, intrusion detection systems, and secure network design.',
    slug: 'advanced-network-security',
    image: '/images/course2.jpg',
    published: true
  },
  {
    id: '3',
    title: 'Digital Forensics Fundamentals',
    description: 'Learn the basics of digital forensics, including evidence collection, preservation, analysis, and reporting.',
    slug: 'digital-forensics-fundamentals',
    image: '/images/course3.jpg',
    published: true
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(coursesData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch courses from an API
    // For now, we'll use the mock data
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expand your knowledge and skills with our comprehensive cyber security courses.
          Learn from industry experts and gain practical experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold px-4 text-center">{course.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{course.description}</p>
              <Link 
                href={`/courses/${course.slug}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 