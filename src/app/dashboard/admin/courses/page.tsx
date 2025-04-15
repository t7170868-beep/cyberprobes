'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define interfaces for type safety
interface CourseMaterial {
  id: string;
  title: string;
  type: string;
  url: string;
  courseId: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  published: boolean;
  materials?: CourseMaterial[]; // Add optional materials property
}

interface MaterialsMap {
  [courseId: string]: CourseMaterial[];
}

// Mock data for courses
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Cyber Security',
    description: 'Learn the fundamentals of cyber security, including threat identification, risk assessment, and basic protection strategies.',
    slug: 'intro-to-cyber-security',
    published: true
  },
  {
    id: '2',
    title: 'Advanced Network Security',
    description: 'Dive deep into network security protocols, firewall configuration, intrusion detection systems, and secure network design.',
    slug: 'advanced-network-security',
    published: true
  },
  {
    id: '3',
    title: 'Digital Forensics Fundamentals',
    description: 'Learn the basics of digital forensics, including evidence collection, preservation, analysis, and reporting.',
    slug: 'digital-forensics-fundamentals',
    published: true
  }
];

// Mock data for course materials
const initialMaterials: MaterialsMap = {
  '1': [
    {
      id: '1-1',
      title: 'Course Introduction',
      type: 'VIDEO',
      url: 'https://www.youtube.com/embed/inWWhr5tnEA',
      courseId: '1'
    },
    {
      id: '1-2',
      title: 'Cyber Security Basics',
      type: 'PDF',
      url: '/documents/cyber-security-basics.pdf',
      courseId: '1'
    },
    {
      id: '1-3',
      title: 'Threat Assessment',
      type: 'VIDEO',
      url: 'https://www.youtube.com/embed/Dk-ZqQ-bfy4',
      courseId: '1'
    }
  ],
  '2': [
    {
      id: '2-1',
      title: 'Network Security Overview',
      type: 'VIDEO',
      url: 'https://www.youtube.com/embed/PYXdlQwkRrI',
      courseId: '2'
    },
    {
      id: '2-2',
      title: 'Firewall Configuration Guide',
      type: 'PDF',
      url: '/documents/firewall-config-guide.pdf',
      courseId: '2'
    }
  ],
  '3': [
    {
      id: '3-1',
      title: 'Introduction to Digital Forensics',
      type: 'VIDEO',
      url: 'https://www.youtube.com/embed/inWWhr5tnEA',
      courseId: '3'
    },
    {
      id: '3-2',
      title: 'Evidence Collection Guidelines',
      type: 'PDF',
      url: '/documents/evidence-collection.pdf',
      courseId: '3'
    }
  ]
};

export default function AdminCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [materials, setMaterials] = useState<MaterialsMap>(initialMaterials);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  // Course form states
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseForm, setCourseForm] = useState<Course>({
    id: '',
    title: '',
    description: '',
    slug: '',
    published: true
  });
  
  // Material form states
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [materialForm, setMaterialForm] = useState<CourseMaterial>({
    id: '',
    title: '',
    type: 'VIDEO',
    url: '',
    courseId: ''
  });
  
  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const courseVideoRef = useRef<HTMLInputElement>(null);
  
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [courseVideoUploading, setCourseVideoUploading] = useState(false);
  const [courseVideoUrl, setCourseVideoUrl] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    if (status === 'authenticated') {
      fetchCourses();
    }
  }, [status, router]);
  
  // Add a function to fetch courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      
      setCourses(data);
      
      // Create a materials map
      const materialsMap: MaterialsMap = {};
      data.forEach((course: Course) => {
        if (course.materials) {
          materialsMap[course.id] = course.materials;
        } else {
          materialsMap[course.id] = [];
        }
      });
      
      setMaterials(materialsMap);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  
  // Course form handlers
  const handleCourseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCourseForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Update slug if title changes (only for new courses)
    if (name === 'title' && !isEditingCourse) {
      setCourseForm(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }));
    }
  };
  
  // Modify the handleCourseSubmit function to use the API
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingCourse) {
        // Update existing course
        const response = await fetch(`/api/courses/${courseForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(courseForm)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update course');
        }
        
        const updatedCourse = await response.json();
        setCourses(prev => prev.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        ));
      } else {
        // Add new course
        const response = await fetch('/api/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(courseForm)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create course');
        }
        
        const newCourse = await response.json();
        setCourses(prev => [...prev, newCourse]);
        
        // Initialize materials array for the new course
        setMaterials(prev => ({
          ...prev,
          [newCourse.id]: []
        }));
        
        // If we have a video URL, add it as a course material
        if (courseVideoUrl) {
          const materialResponse = await fetch('/api/course-materials', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `${courseForm.title} - Introduction Video`,
              type: 'VIDEO',
              url: courseVideoUrl,
              courseId: newCourse.id
            })
          });
          
          if (materialResponse.ok) {
            const materialData = await materialResponse.json();
            
            // Update materials state
            setMaterials(prev => ({
              ...prev,
              [newCourse.id]: [materialData]
            }));
          }
        }
      }
      
      // Reset form
      setCourseForm({
        id: '',
        title: '',
        description: '',
        slug: '',
        published: true
      });
      setCourseVideoUrl('');
      if (courseVideoRef.current) {
        courseVideoRef.current.value = '';
      }
      setShowCourseForm(false);
      setIsEditingCourse(false);
    } catch (error) {
      console.error('Error submitting course:', error);
      alert(error instanceof Error ? error.message : 'Failed to save course');
    }
  };
  
  // Material form handlers
  const handleMaterialFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMaterialForm(prev => ({
      ...prev,
      [name]: value
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
    setUploadError('');
    
    try {
      // Create form data for the upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', materialForm.type);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      clearInterval(progressInterval); // Clear the interval
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      setUploadProgress(100); // Set to 100% when complete
      
      const data = await response.json();
      
      // Update the material form with the file URL
      setMaterialForm(prev => ({
        ...prev,
        url: data.filePath
      }));
      
      // Reset upload state
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clear upload progress after a delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      setIsUploading(false);
    }
  };
  
  // Modify the handleMaterialSubmit function to use the API
  const handleMaterialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) return;
    
    try {
      if (isEditingMaterial) {
        // Update existing material
        const response = await fetch(`/api/course-materials/${materialForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(materialForm)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update material');
        }
        
        const updatedMaterial = await response.json();
        
        setMaterials(prev => ({
          ...prev,
          [selectedCourse]: prev[selectedCourse].map(material => 
            material.id === updatedMaterial.id ? updatedMaterial : material
          )
        }));
      } else {
        // Add new material
        const newMaterial = { 
          ...materialForm, 
          courseId: selectedCourse
        };
        
        const response = await fetch('/api/course-materials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMaterial)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create material');
        }
        
        const createdMaterial = await response.json();
        
        setMaterials(prev => ({
          ...prev,
          [selectedCourse]: [...prev[selectedCourse], createdMaterial]
        }));
      }
      
      // Reset form
      setMaterialForm({
        id: '',
        title: '',
        type: 'VIDEO',
        url: '',
        courseId: selectedCourse
      });
      setShowMaterialForm(false);
      setIsEditingMaterial(false);
    } catch (error) {
      console.error('Error submitting material:', error);
      alert(error instanceof Error ? error.message : 'Failed to save material');
    }
  };
  
  const editCourse = (id: string) => {
    const courseToEdit = courses.find(course => course.id === id);
    if (courseToEdit) {
      setCourseForm(courseToEdit);
      setShowCourseForm(true);
      setIsEditingCourse(true);
    }
  };
  
  // Modify the deleteCourse function to use the API
  const deleteCourse = async (id: string) => {
    if (confirm('Are you sure you want to delete this course? All associated materials will also be deleted.')) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete course');
        }
        
        // Remove from state
        setCourses(prev => prev.filter(course => course.id !== id));
        
        // Remove course materials
        setMaterials(prev => {
          const newMaterials = { ...prev };
          delete newMaterials[id];
          return newMaterials;
        });
        
        // If the deleted course was selected, deselect it
        if (selectedCourse === id) {
          setSelectedCourse(null);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert(error instanceof Error ? error.message : 'Failed to delete course');
      }
    }
  };
  
  const editMaterial = (id: string) => {
    if (!selectedCourse) return;
    
    const materialToEdit = materials[selectedCourse].find(material => material.id === id);
    if (materialToEdit) {
      setMaterialForm(materialToEdit);
      setShowMaterialForm(true);
      setIsEditingMaterial(true);
    }
  };
  
  // Modify the deleteMaterial function to use the API
  const deleteMaterial = async (id: string) => {
    if (!selectedCourse) return;
    
    if (confirm('Are you sure you want to delete this material?')) {
      try {
        const response = await fetch(`/api/course-materials/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete material');
        }
        
        setMaterials(prev => ({
          ...prev,
          [selectedCourse]: prev[selectedCourse].filter(material => material.id !== id)
        }));
      } catch (error) {
        console.error('Error deleting material:', error);
        alert(error instanceof Error ? error.message : 'Failed to delete material');
      }
    }
  };
  
  // Course video upload handler
  const handleCourseVideoUpload = async () => {
    if (!courseVideoRef.current?.files || !courseVideoRef.current.files[0]) {
      alert('Please select a video file to upload');
      return;
    }
    
    const videoFile = courseVideoRef.current.files[0];
    setCourseVideoUploading(true);
    
    try {
      // Create form data for the upload
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('type', 'VIDEO');
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Video upload failed');
      }
      
      const data = await response.json();
      setCourseVideoUrl(data.filePath);
      
      alert('Video uploaded successfully! It will be attached to the course when you save.');
    } catch (error) {
      console.error('Error uploading course video:', error);
      alert(error instanceof Error ? error.message : 'Video upload failed');
    } finally {
      setCourseVideoUploading(false);
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Course Management</h1>
              <p className="text-gray-200">Create, update and manage courses and their materials</p>
            </div>
            <Link href="/dashboard/admin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {/* Course Management Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Courses</h2>
              <button
                onClick={() => {
                  setCourseForm({
                    id: '',
                    title: '',
                    description: '',
                    slug: '',
                    published: true
                  });
                  setIsEditingCourse(false);
                  setShowCourseForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add New Course
              </button>
            </div>
            
            {/* Course Form */}
            {showCourseForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">{isEditingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={courseForm.title}
                      onChange={handleCourseFormChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={courseForm.description}
                      onChange={handleCourseFormChange}
                      required
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL-friendly name)</label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={courseForm.slug}
                      onChange={handleCourseFormChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used in the course URL: /courses/{courseForm.slug}
                    </p>
                  </div>
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-800 mb-2">Add Featured Video</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload a video to feature on the course page. You can add more materials after creating the course.
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={courseVideoRef}
                        className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="video/*"
                      />
                      <button
                        type="button"
                        onClick={handleCourseVideoUpload}
                        disabled={courseVideoUploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                      >
                        {courseVideoUploading ? 'Uploading...' : 'Upload Video'}
                      </button>
                    </div>
                    
                    {courseVideoUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Video uploaded successfully
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={courseForm.published}
                      onChange={handleCourseFormChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                      Published (visible to users)
                    </label>
                  </div>
                  
                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                    >
                      {isEditingCourse ? 'Update Course' : 'Create Course'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setShowCourseForm(false);
                        setIsEditingCourse(false);
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Courses Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Materials
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map(course => (
                    <tr key={course.id} className={selectedCourse === course.id ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{course.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {materials[course.id] ? materials[course.id].length : 0} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          {selectedCourse === course.id ? 'Hide Materials' : 'Manage Materials'}
                        </button>
                        <button
                          onClick={() => editCourse(course.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
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
          </div>
          
          {/* Course Materials Section */}
          {selectedCourse && (
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Course Materials for: {courses.find(c => c.id === selectedCourse)?.title}
                </h2>
                <button
                  onClick={() => {
                    setMaterialForm({
                      id: '',
                      title: '',
                      type: 'VIDEO',
                      url: '',
                      courseId: selectedCourse
                    });
                    setIsEditingMaterial(false);
                    setShowMaterialForm(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Add New Material
                </button>
              </div>
              
              {/* Material Form */}
              {showMaterialForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">{isEditingMaterial ? 'Edit Material' : 'Add Course Material'}</h3>
                  
                  <form onSubmit={handleMaterialSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={materialForm.title}
                        onChange={handleMaterialFormChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
                      <select
                        id="type"
                        name="type"
                        value={materialForm.type}
                        onChange={handleMaterialFormChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="VIDEO">Video</option>
                        <option value="PDF">PDF Document</option>
                        <option value="DOCUMENT">Text Document</option>
                        <option value="IMAGE">Image</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {materialForm.type === 'VIDEO' ? 'Video Source' : 'File Source'}
                      </label>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            <input
                              id="source-url"
                              name="source"
                              type="radio"
                              checked={materialForm.url !== '' && !materialForm.url.startsWith('/')}
                              onChange={() => {
                                if (!materialForm.url || materialForm.url.startsWith('/')) {
                                  setMaterialForm(prev => ({ ...prev, url: '' }))
                                }
                              }}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="source-url" className="ml-2 block text-sm font-medium text-gray-700">
                              {materialForm.type === 'VIDEO' ? 'Use YouTube URL' : 'Use External URL'}
                            </label>
                          </div>
                          
                          <div className="flex items-center ml-6">
                            <input
                              id="source-upload"
                              name="source"
                              type="radio"
                              checked={materialForm.url === '' || materialForm.url.startsWith('/')}
                              onChange={() => {
                                if (materialForm.url && !materialForm.url.startsWith('/')) {
                                  setMaterialForm(prev => ({ ...prev, url: '' }))
                                }
                              }}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="source-upload" className="ml-2 block text-sm font-medium text-gray-700">
                              {materialForm.type === 'VIDEO' ? 'Upload Video File' : 'Upload File'}
                            </label>
                          </div>
                        </div>
                        
                        {/* URL Input Section */}
                        {(!materialForm.url || !materialForm.url.startsWith('/')) && (
                          <div className="mb-4">
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                              {materialForm.type === 'VIDEO' 
                                ? 'YouTube Embed URL'
                                : 'External File URL'}
                            </label>
                            <input
                              type="text"
                              id="url"
                              name="url"
                              value={materialForm.url}
                              onChange={handleMaterialFormChange}
                              className="w-full p-2 border border-gray-300 rounded"
                              placeholder={materialForm.type === 'VIDEO' 
                                ? 'https://www.youtube.com/embed/VIDEO_ID' 
                                : 'https://example.com/file.pdf'}
                            />
                            {materialForm.type === 'VIDEO' && (
                              <p className="text-xs text-gray-500 mt-1">
                                Use YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
                              </p>
                            )}
                          </div>
                        )}
                        
                        {/* File Upload Section */}
                        {(materialForm.url === '' || materialForm.url.startsWith('/')) && (
                          <div className="border border-dashed border-gray-300 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">
                                  {materialForm.type === 'VIDEO' 
                                    ? 'Select video file to upload'
                                    : materialForm.type === 'PDF'
                                      ? 'Select PDF file to upload'
                                      : materialForm.type === 'IMAGE'
                                        ? 'Select image file to upload'
                                        : 'Select file to upload'}
                                </label>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                  className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  accept={materialForm.type === 'VIDEO' 
                                    ? 'video/*' 
                                    : materialForm.type === 'PDF' 
                                      ? 'application/pdf' 
                                      : materialForm.type === 'IMAGE' 
                                        ? 'image/*' 
                                        : '*/*'}
                                />
                                <button
                                  type="button"
                                  onClick={handleFileUpload}
                                  disabled={!selectedFile || isUploading}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                                >
                                  {isUploading ? 'Uploading...' : 'Upload'}
                                </button>
                              </div>
                              
                              {selectedFile && (
                                <p className="text-sm text-gray-600">
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
                              
                              {materialForm.url && materialForm.url.startsWith('/') && (
                                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                  <p className="text-sm text-green-700 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    File uploaded successfully
                                  </p>
                                  <p className="text-xs text-green-600 ml-6">{materialForm.url}</p>
                                </div>
                              )}
                              
                              {materialForm.type === 'VIDEO' && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported formats: MP4, WebM, OGG, MOV, AVI, MKV
                                </p>
                              )}
                              
                              {materialForm.type === 'PDF' && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported format: PDF
                                </p>
                              )}
                              
                              {materialForm.type === 'IMAGE' && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported formats: JPG, JPEG, PNG, GIF, WebP
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                      >
                        {isEditingMaterial ? 'Update Material' : 'Add Material'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowMaterialForm(false);
                          setIsEditingMaterial(false);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Materials Table */}
              {materials[selectedCourse] && materials[selectedCourse].length > 0 ? (
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
                          URL/Path
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {materials[selectedCourse].map(material => (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{material.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              material.type === 'VIDEO' ? 'bg-blue-100 text-blue-800' :
                              material.type === 'PDF' ? 'bg-red-100 text-red-800' :
                              material.type === 'DOCUMENT' ? 'bg-green-100 text-green-800' :
                              material.type === 'IMAGE' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {material.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 truncate max-w-xs">{material.url}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => editMaterial(material.id)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteMaterial(material.id)}
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
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No materials added for this course yet.</p>
                  <p className="mt-2">
                    <button
                      onClick={() => {
                        setMaterialForm({
                          id: '',
                          title: '',
                          type: 'VIDEO',
                          url: '',
                          courseId: selectedCourse
                        });
                        setIsEditingMaterial(false);
                        setShowMaterialForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Add your first material
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 