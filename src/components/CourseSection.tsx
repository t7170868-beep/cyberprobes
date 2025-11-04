'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  category: string;
  level: string;
  duration?: string;
  price: number;
  instructor?: string;
}

const courseCategories = [
  { id: 'all', name: 'All Courses', icon: '📚' },
  { id: 'Cybersecurity', name: '🔒 Cybersecurity', icon: '🔒' },
  { id: 'Digital Forensics', name: '🕵️ Digital Forensics', icon: '🕵️' },
  { id: 'Cloud Security', name: '☁️ Cloud Security', icon: '☁️' },
  { id: 'Ethical Hacking', name: '💻 Ethical Hacking', icon: '💻' },
  { id: 'AI in Cyber Defense', name: '🧠 AI in Cyber Defense', icon: '🧠' },
];

export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(c => c.category === activeCategory));
    }
  }, [activeCategory, courses]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses?published=true');
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden scroll-reveal">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold cyber-text mb-6">
            Explore Cybersecurity & Forensics Courses
          </h2>
          <p className="font-rajdhani text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Learn to investigate digital crimes, secure networks, and defend systems from cyber threats — guided by experts from the industry.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="glass-card px-8 py-3 rounded-xl font-rajdhani font-semibold text-white border border-cyber-blue/50 hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all magnetic-button"
            >
              View All Courses
            </Link>
            <Link
              href="/courses"
              className="glass-card px-8 py-3 rounded-xl font-rajdhani font-semibold bg-cyber-blue text-white hover:bg-cyber-blue/80 transition-all magnetic-button"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {courseCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all magnetic-button ${
                activeCategory === category.id
                  ? 'glass-card border-2 border-cyber-blue bg-cyber-blue/20 text-white'
                  : 'glass-card border border-gray-600 text-gray-300 hover:border-cyber-blue/50 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-rajdhani text-gray-300">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-rajdhani text-xl text-gray-300 mb-4">No courses available in this category yet.</p>
            <Link
              href="/courses"
              className="inline-block glass-card px-6 py-3 rounded-xl font-rajdhani font-semibold text-cyber-blue hover:text-white transition-colors"
            >
              Browse All Courses →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCourses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="glass-card rounded-xl overflow-hidden group hover:border-cyber-blue/50 transition-all magnetic-button"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-neon-purple/20 flex items-center justify-center">
                      <svg className="w-16 h-16 text-cyber-blue opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyber-blue/90 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${
                      course.level === 'Beginner' ? 'bg-neon-green/90 text-black' :
                      course.level === 'Intermediate' ? 'bg-cyber-blue/90 text-white' :
                      'bg-neon-purple/90 text-white'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-rajdhani text-gray-400">{course.category}</span>
                    {course.duration && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs font-rajdhani text-gray-400">{course.duration}</span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="font-inter text-gray-300 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {course.instructor && (
                    <p className="font-rajdhani text-xs text-gray-400 mb-4">
                      By {course.instructor}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="font-orbitron text-2xl font-bold cyber-text">
                      {course.price === 0 ? 'Free' : `₹${course.price}`}
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-4 py-2 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white transition-all font-rajdhani font-semibold text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Link */}
        {filteredCourses.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-block glass-card px-8 py-3 rounded-xl font-rajdhani font-semibold text-cyber-blue hover:text-white border border-cyber-blue/50 hover:border-cyber-blue transition-all magnetic-button"
            >
              View All {filteredCourses.length} Courses →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

