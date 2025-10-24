'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const courseCategories = [
  {
    id: 'digital-forensics',
    title: 'Digital Forensics',
    description: 'Learn the art and science of recovering and investigating digital evidence in cyber investigations.',
    levels: [
      {
        id: 'beginner',
        title: 'Beginner',
        description: 'Learn the basics of cybercrime investigation and digital evidence.'
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'Get hands-on with forensic tools and real-world case studies.'
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Master advanced forensic techniques and incident response.'
      }
    ]
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    description: 'Master the techniques and tools needed to identify and fix security vulnerabilities.',
    levels: [
      {
        id: 'beginner',
        title: 'Beginner',
        description: 'Understand the fundamentals of ethical hacking and penetration testing.'
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'Practice exploiting vulnerabilities in controlled environments.'
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Learn advanced offensive security skills and red teaming.'
      }
    ]
  }
];

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch courses from an API
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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Cyber Courses</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dive into our expertly crafted courses designed for every skill level. 
            From beginners to advanced professionals, we have the right course for you.
          </p>
        </div>

        {/* Course Categories Section */}
        <div className="space-y-16">
          {courseCategories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {category.title.charAt(0)}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🔹 {category.title}</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{category.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.levels.map((level) => (
                  <div 
                    key={`${category.id}-${level.id}`} 
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{level.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{level.description}</p>
                    <Link 
                      href={`/cyber-courses/category/${category.id}/level/${level.id}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                      Explore Courses
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to advance your cybersecurity career?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of professionals who trust CyberProbes for their education needs
          </p>
          <Link 
            href="/auth/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Start Learning Today
          </Link>
        </div>
      </div>
    </div>
  );
} 