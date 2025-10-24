'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define course type
interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  published: boolean;
  image?: string;
  createdAt: string;
  materials?: any[];
}

export default function CourseLevelPage() {
  const params = useParams();
  const { categoryId, levelId } = params;
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get category and level display names
  const getCategoryName = (id: string) => {
    switch(id) {
      case 'digital-forensics': return 'Digital Forensics';
      case 'ethical-hacking': return 'Ethical Hacking';
      default: return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  };
  
  const getLevelName = (id: string) => {
    switch(id) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  };
  
  useEffect(() => {
    // Fetch courses from API with published=true parameter
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses?published=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const allCourses = await response.json();
        
        // Filter courses by category and level
        // In a real implementation, you would have category and level fields
        // For now, we'll just simulate filtering based on the category and level params
        const filteredCourses = allCourses.filter((course: Course) => {
          // This is a placeholder filter - in a real application, you would
          // have proper category and level fields to filter by
          return course.published === true;
        });
        
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [categoryId, levelId]);
  
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
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
              {getCategoryName(categoryId as string).charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getCategoryName(categoryId as string)} - {getLevelName(levelId as string)} Level
              </h1>
              <p className="text-gray-600">
                Explore our {getLevelName(levelId as string).toLowerCase()} level courses in {getCategoryName(categoryId as string).toLowerCase()}
              </p>
            </div>
          </div>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Courses Available Yet</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We're currently developing courses for this category and level. Please check back soon!
            </p>
            <Link 
              href="/cyber-courses"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Explore Other Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image 
                    src={course.image || '/images/course-placeholder.jpg'} 
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {course.materials ? course.materials.length : 0} modules
                    </span>
                    <Link 
                      href={`/cyber-courses/details/${course.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Course →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 