'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FALLBACK_COURSES from '@/data/fallbackCourses';
import type { CourseSummary } from '@/types/course';

const courseCategories = [
  { id: 'all', name: 'All Courses', icon: '📚' },
  { id: 'Cybersecurity', name: 'Cybersecurity', icon: '🔒' },
  { id: 'Digital Forensics', name: 'Digital Forensics', icon: '🕵️' },
  { id: 'Cloud Security', name: 'Cloud Security', icon: '☁️' },
  { id: 'Ethical Hacking', name: 'Ethical Hacking', icon: '💻' },
  { id: 'AI in Cyber Defense', name: 'AI in Cyber Defense', icon: '🧠' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseSummary[]>([]);
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

  const applyCourses = (data: CourseSummary[]) => {
    setCourses(data);
    if (activeCategory === 'all') {
      setFilteredCourses(data);
    } else {
      setFilteredCourses(data.filter((c) => c.category === activeCategory));
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses?published=true');
      if (!res.ok) {
        throw new Error(`Failed to fetch courses: ${res.status}`);
      }

      const data: CourseSummary[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('Courses API returned no data, using fallback catalogue');
        applyCourses(FALLBACK_COURSES);
        return;
      }

      applyCourses(data);
    } catch (error) {
      console.error('Error fetching courses, using fallback catalogue instead:', error);
      applyCourses(FALLBACK_COURSES);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold cyber-text mb-6">
            Cybersecurity & Forensics Courses
          </h1>
          <p className="font-rajdhani text-xl text-gray-300 max-w-3xl mx-auto">
            Learn to investigate digital crimes, secure networks, and defend systems from cyber threats — guided by experts from the industry.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {courseCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveCategory(category.id);
              }}
              className={`px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all magnetic-button ${
                activeCategory === category.id
                  ? 'glass-card border-2 border-cyber-blue bg-cyber-blue/20 text-white'
                  : 'glass-card border border-gray-600 text-gray-300 hover:border-cyber-blue/50 hover:text-white'
              }`}
            >
              {category.icon} {category.name}
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
            <p className="font-inter text-gray-400">Check back soon for new courses!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCourses.map((course) => (
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyber-blue/90 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold shadow-lg transition-all ${
                      course.level === 'Beginner' ? 'bg-neon-green/90 text-black shadow-neon-green/50' :
                      course.level === 'Intermediate' ? 'bg-cyber-blue/90 text-white shadow-cyber-blue/50' :
                      'bg-neon-purple/90 text-white shadow-neon-purple/50'
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
                  
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors line-clamp-2">
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
                      className="px-4 py-2 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue/50 transition-all font-rajdhani font-semibold text-sm"
                    >
                      View Details →
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
