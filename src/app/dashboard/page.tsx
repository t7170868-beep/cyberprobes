'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    // Fetch videos if authenticated
    if (status === 'authenticated') {
      fetchVideos();
    }
  }, [status, router]);
  
  const fetchVideos = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an API call to fetch videos
      // For demo purposes, we'll use mock data
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Introduction to Cyber Security',
          description: 'Learn the basics of cyber security and why it matters for your business.',
          url: 'https://www.youtube.com/embed/inWWhr5tnEA'
        },
        {
          id: '2',
          title: 'Common Security Threats',
          description: 'Understand the most common security threats facing organizations today.',
          url: 'https://www.youtube.com/embed/Dk-ZqQ-bfy4'
        },
        {
          id: '3',
          title: 'Security Best Practices',
          description: 'Essential security best practices for protecting your digital assets.',
          url: 'https://www.youtube.com/embed/PYXdlQwkRrI'
        }
      ];
      
      setVideos(mockVideos);
      setSelectedVideo(mockVideos[0]);
    } catch (err) {
      console.error('Error fetching videos:', err);
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
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6">
          <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
          <p className="text-gray-200">Access exclusive cyber security videos and resources.</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Video Player */}
            <div className="lg:w-2/3">
              {selectedVideo ? (
                <div>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
                    <iframe
                      src={selectedVideo.url}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
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
              ) : (
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
  );
} 