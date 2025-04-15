'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define interfaces for type safety
interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image?: string;
  published: boolean;
  date?: string;
  author?: string;
  createdAt?: string;
}

export default function AdminBlogsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [blogForm, setBlogForm] = useState<Blog>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    image: '',
    author: '',
    published: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    if (status === 'authenticated') {
      fetchBlogs();
    }
  }, [status, router]);
  
  // Function to fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/blogs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Blog form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setBlogForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Update slug if title changes (only for new blogs)
    if (name === 'title' && !isEditing) {
      setBlogForm(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (isEditing) {
        // Update existing blog
        const response = await fetch(`/api/blogs/${blogForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: blogForm.title,
            content: blogForm.content,
            slug: blogForm.slug,
            image: blogForm.image,
            published: blogForm.published
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update blog');
        }
        
        const updatedBlog = await response.json();
        
        // Update blogs list with updated blog
        setBlogs(prev => prev.map(blog => 
          blog.id === updatedBlog.id ? updatedBlog : blog
        ));
        
        setSuccess('Blog updated successfully!');
      } else {
        // Create new blog
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: blogForm.title,
            content: blogForm.content,
            slug: blogForm.slug,
            image: blogForm.image,
            published: blogForm.published
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create blog');
        }
        
        const newBlog = await response.json();
        
        // Add new blog to list
        setBlogs(prev => [...prev, newBlog]);
        
        setSuccess('Blog created successfully!');
      }
      
      // Reset form
      setBlogForm({
        id: '',
        title: '',
        excerpt: '',
        content: '',
        slug: '',
        image: '',
        author: '',
        published: true
      });
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting blog:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const editBlog = (id: string) => {
    const blogToEdit = blogs.find(blog => blog.id === id);
    if (blogToEdit) {
      // Set form with blog data
      setBlogForm({
        id: blogToEdit.id,
        title: blogToEdit.title,
        excerpt: blogToEdit.excerpt || '',
        content: blogToEdit.content,
        slug: blogToEdit.slug,
        image: blogToEdit.image || '',
        author: blogToEdit.author || '',
        published: blogToEdit.published
      });
      setShowForm(true);
      setIsEditing(true);
    }
  };
  
  const deleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete blog');
        }
        
        // Remove blog from list
        setBlogs(prev => prev.filter(blog => blog.id !== id));
        setSuccess('Blog deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError(error instanceof Error ? error.message : 'Failed to delete blog');
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
              <h1 className="text-2xl font-bold">Blog Management</h1>
              <p className="text-gray-200">Create, update and delete blog posts</p>
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
            <h2 className="text-xl font-semibold">All Blog Posts</h2>
            <button
              onClick={() => {
                setBlogForm({
                  id: '',
                  title: '',
                  excerpt: '',
                  content: '',
                  slug: '',
                  image: '',
                  author: '',
                  published: true
                });
                setShowForm(true);
                setIsEditing(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add New Post
            </button>
          </div>
          
          {/* Blog Form */}
          {showForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={blogForm.title}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={blogForm.slug}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={blogForm.excerpt}
                    onChange={handleFormChange}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={blogForm.content}
                    onChange={handleFormChange}
                    required
                    rows={10}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={blogForm.image}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={blogForm.author}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={blogForm.published}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Published
                  </label>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
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
          
          {/* Blogs Table */}
          {blogs.length > 0 ? (
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
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map(blog => (
                    <tr key={blog.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{blog.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(blog.date || blog.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => editBlog(blog.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.id)}
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
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts found. Create your first post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 