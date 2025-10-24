'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  published: boolean;
  createdAt?: string;
}

export default function AdminVideosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Video form state
  const [videoForm, setVideoForm] = useState<Video>({
    id: '',
    title: '',
    description: '',
    url: '',
    published: true
  });

  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Success/error messages
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    if (status === 'authenticated') {
      fetchVideos();
    }
  }, [status, router]);
  
  // Function to fetch videos from API
  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/videos');
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Video form handlers
  const handleVideoFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setVideoForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  // File handling functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError('');
    }
  };
  
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create form data for the upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', 'VIDEO');
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }
      
      const data = await response.json();
      
      // Update form with the uploaded file path
      setVideoForm(prev => ({
        ...prev,
        url: data.filePath
      }));
      
      setUploadProgress(100);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (isEditing) {
        // Update existing video
        const response = await fetch(`/api/videos/${videoForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: videoForm.title,
            description: videoForm.description,
            url: videoForm.url,
            published: videoForm.published
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update video');
        }
        
        const updatedVideo = await response.json();
        
        // Update videos list with updated video
        setVideos(prev => prev.map(video => 
          video.id === updatedVideo.id ? updatedVideo : video
        ));
        
        setSuccess('Video updated successfully!');
      } else {
        // Create new video
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: videoForm.title,
            description: videoForm.description,
            url: videoForm.url,
            published: videoForm.published
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create video');
        }
        
        const newVideo = await response.json();
        
        // Add new video to list
        setVideos(prev => [...prev, newVideo]);
        
        setSuccess('Video created successfully!');
      }
      
      // Reset form
      setVideoForm({
        id: '',
        title: '',
        description: '',
        url: '',
        published: true
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setShowVideoForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting video:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const editVideo = (id: string) => {
    const videoToEdit = videos.find(video => video.id === id);
    if (videoToEdit) {
      // Set form with video data
      setVideoForm({
        id: videoToEdit.id,
        title: videoToEdit.title,
        description: videoToEdit.description || '',
        url: videoToEdit.url,
        published: videoToEdit.published
      });
      setShowVideoForm(true);
      setIsEditing(true);
      // Clear selected file when editing
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const deleteVideo = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/videos/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete video');
        }
        
        // Remove video from list
        setVideos(prev => prev.filter(video => video.id !== id));
        setSuccess('Video deleted successfully!');
        
        // If the deleted video was selected, clear selection
        if (selectedVideo && selectedVideo.id === id) {
          setSelectedVideo(null);
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        setError(error instanceof Error ? error.message : 'Failed to delete video');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  if (status === 'loading' || isLoading) {
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Video Management</h1>
              <p className="text-gray-200">Upload, edit, and manage course videos</p>
            </div>
            <Link href="/dashboard/admin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {/* Success and Error messages */}
          {success && (
            <div className="bg-green-50 text-green-800 p-4 mb-6 rounded-lg">
              {success}
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-800 p-4 mb-6 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Videos</h2>
            <button
              onClick={() => {
                setVideoForm({
                  id: '',
                  title: '',
                  description: '',
                  url: '',
                  published: true
                });
                setShowVideoForm(true);
                setIsEditing(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add New Video
            </button>
          </div>
          
          {/* Video Form */}
          {showVideoForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Video' : 'Create New Video'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={videoForm.title}
                    onChange={handleVideoFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={videoForm.description || ''}
                    onChange={handleVideoFormChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                
                <div className="border border-dashed border-gray-300 rounded-lg p-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="video/*"
                      />
                      <button
                        type="button"
                        onClick={handleFileUpload}
                        disabled={!selectedFile || isUploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                      >
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                    
                    {selectedFile && (
                      <p className="text-sm text-gray-600 mt-2">
                        Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      </p>
                    )}
                    
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    {uploadError && (
                      <p className="text-sm text-red-600 mt-2">{uploadError}</p>
                    )}
                    
                    {videoForm.url && videoForm.url.startsWith('/uploads/') && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-700 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Video uploaded successfully
                        </p>
                        <p className="text-xs text-green-600 ml-6">{videoForm.url}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 font-medium mb-1">OR enter YouTube embed URL</p>
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={videoForm.url}
                      onChange={handleVideoFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={videoForm.published}
                    onChange={handleVideoFormChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Published (visible to users)
                  </label>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Update Video' : 'Create Video'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowVideoForm(false);
                      setIsEditing(false);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Videos Table */}
          {videos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preview
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {videos.map(video => (
                    <tr key={video.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{video.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[300px]">
                          {video.description || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {video.url.includes('youtube.com') ? 'YouTube Embed' : 'Uploaded Video'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          video.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {video.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Preview
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => editVideo(video.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No videos available. Click "Add New Video" to create one.</p>
            </div>
          )}
          
          {/* Video Preview Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                    <button 
                      onClick={() => setSelectedVideo(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
                    {selectedVideo.url.includes('youtube.com') ? (
                      <iframe
                        src={selectedVideo.url}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    ) : (
                      <video
                        src={selectedVideo.url}
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  
                  {selectedVideo.description && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Description:</h4>
                      <p className="text-gray-600">{selectedVideo.description}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 