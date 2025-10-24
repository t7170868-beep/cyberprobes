'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  published: boolean;
  image?: string;
  createdAt: string;
  materials: any[];
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        // First get all published courses
        const response = await fetch(`/api/courses?published=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const courses = await response.json();
        
        // Find the course with matching slug
        const foundCourse = courses.find((c: Course) => c.slug === slug);
        
        if (!foundCourse) {
          // If course not found or not published, redirect to courses page
          router.push('/cyber-courses');
          return;
        }
        
        setCourse(foundCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourse();
  }, [slug, router]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
          {error}
        </div>
        <Link href="/cyber-courses" className="text-blue-600 hover:text-blue-800">
          Back to All Courses
        </Link>
      </div>
    );
  }
  
  if (!course) {
    return null; // Redirect handled in useEffect
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/cyber-courses" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Courses
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="relative h-64 md:h-80">
            <Image 
              src={course.image || '/images/course-placeholder.jpg'} 
              alt={course.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-200 max-w-3xl">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-10">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Contents</h2>
              
              {course.materials && course.materials.length > 0 ? (
                <div className="space-y-4">
                  {course.materials.map((material, index) => (
                    <div key={material.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="bg-blue-600 text-white text-lg font-semibold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{material.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">Type: {material.type}</p>
                          
                          {/* Simple note about material access */}
                          <div className="bg-blue-50 p-2 rounded flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Enroll to access this course material</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Course materials are being prepared. Check back soon!
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to start learning?</h3>
                <p className="text-gray-600">Enroll in this course to access all lessons, videos, and materials</p>
              </div>
              <Link 
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 