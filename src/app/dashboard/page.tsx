'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  published: boolean;
}

interface Enrollment {
  id: string;
  progress: number;
  course: {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    description: string;
    category: string;
    level: string;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    // Fetch videos and enrollments if authenticated
    if (status === 'authenticated') {
      fetchVideos();
      fetchEnrollments();
    }
  }, [status, router]);

  const fetchEnrollments = async () => {
    setCoursesLoading(true);
    try {
      const response = await fetch('/api/enrollments');
      if (response.ok) {
        const data = await response.json();
        setEnrollments(data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setCoursesLoading(false);
    }
  };
  
  const fetchVideos = async () => {
    setLoading(true);
    try {
      // Fetch videos from the API - only published videos for regular users
      const response = await fetch('/api/videos?published=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setVideos(data);
        setSelectedVideo(data[0]);
      } else {
        // Remove fallback videos and just set empty array
        setVideos([]);
        setSelectedVideo(null);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      // Show some fallback content or error message
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return null; // Router will redirect to login
  }

  return (
    <div className="min-h-screen bg-bg-primary py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="glass-card p-8 rounded-xl mb-8">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold cyber-text mb-2">
            Welcome, {session.user?.name}!
          </h1>
          <p className="font-rajdhani text-xl text-gray-300">
            Access your enrolled courses and exclusive cyber security resources.
          </p>
        </div>

        {/* My Courses Section */}
        <div className="glass-card p-8 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-2xl font-bold text-white">My Courses</h2>
            <Link
              href="/courses"
              className="px-4 py-2 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white transition-all font-rajdhani font-semibold"
            >
              Browse Courses
            </Link>
          </div>

          {coursesLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-rajdhani text-gray-300">Loading your courses...</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-600">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-rajdhani text-xl font-semibold text-white mb-2">No courses enrolled yet</h3>
              <p className="font-inter text-gray-400 mb-6">Start your learning journey by enrolling in a course!</p>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 rounded-lg bg-cyber-blue text-white font-rajdhani font-semibold hover:bg-cyber-blue/80 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="glass-card rounded-xl overflow-hidden hover:border-cyber-blue/50 transition-all magnetic-button"
                >
                  <div className="relative h-48">
                    {enrollment.course.thumbnail ? (
                      <Image
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-neon-purple/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-cyber-blue opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${
                        enrollment.course.level === 'Beginner' ? 'bg-neon-green/90 text-black' :
                        enrollment.course.level === 'Intermediate' ? 'bg-cyber-blue/90 text-white' :
                        'bg-neon-purple/90 text-white'
                      }`}>
                        {enrollment.course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-rajdhani text-gray-400">{enrollment.course.category}</span>
                    </div>
                    <h3 className="font-orbitron text-lg font-bold text-white mb-3 line-clamp-2">
                      {enrollment.course.title}
                    </h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-rajdhani text-gray-400">Progress</span>
                        <span className="font-rajdhani text-white">{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-cyber-blue h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/courses/${enrollment.course.slug}`}
                      className="block w-full text-center px-4 py-2 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white transition-all font-rajdhani font-semibold text-sm"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6">
            <h2 className="text-2xl font-bold">Cyber Security Videos</h2>
            <p className="text-gray-200">Access exclusive cyber security videos and resources.</p>
          </div>
          
          <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Video Player */}
            <div className="lg:w-2/3">
              {selectedVideo ? (
                <div>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
                    {selectedVideo.url.includes('youtube.com') ? (
                      // YouTube embed
                      <iframe
                        src={selectedVideo.url}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    ) : (
                      // Self-hosted video
                      <video
                        src={selectedVideo.url}
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                        poster="/images/video-poster.jpg"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                  {selectedVideo.description && (
                    <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Select a video to watch</p>
                </div>
              )}
            </div>
            
            {/* Video List */}
            <div className="lg:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Available Videos</h3>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading videos...</p>
                </div>
              ) : videos.length > 0 ? (
                <div className="space-y-4">
                  {videos.map(video => (
                    <div 
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className={`cursor-pointer p-4 rounded-lg transition ${selectedVideo?.id === video.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <h4 className="font-semibold text-gray-800">{video.title}</h4>
                      {video.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">{video.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No videos available at this time.</p>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      
        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-blue-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Security Guides</h3>
              <p className="text-gray-600 mb-4">
                Download our comprehensive security guides for businesses and individuals.
              </p>
              <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                View Guides →
              </Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-green-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upcoming Webinars</h3>
              <p className="text-gray-600 mb-4">
                Register for our free webinars on various cyber security topics.
              </p>
              <Link href="#" className="text-green-600 hover:text-green-800 font-medium">
                View Schedule →
              </Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-purple-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">FAQ</h3>
              <p className="text-gray-600 mb-4">
                Find answers to frequently asked questions about our services.
              </p>
              <Link href="#" className="text-purple-600 hover:text-purple-800 font-medium">
                Read FAQ →
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
} 