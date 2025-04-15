'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define interfaces for better type safety
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

// Mock data, will be replaced with actual data from API
const initialUsers: User[] = [];

export default function UsersAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [userForm, setUserForm] = useState<Omit<User, 'id' | 'createdAt'> & { id?: string }>({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });
  
  const [bulkUserCount, setBulkUserCount] = useState(5);
  const [bulkUserPrefix, setBulkUserPrefix] = useState('user');
  const [bulkUserRole, setBulkUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [bulkGeneratedUsers, setBulkGeneratedUsers] = useState<UserCredentials[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<UserCredentials | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    // Fetch users when the component mounts and when session is authenticated
    if (status === 'authenticated') {
      fetchUsers();
    }
  }, [status, router]);
  
  // New function to fetch users from the API
  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const response = await fetch('/api/users', {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoadingUsers(false);
    }
  };
  
  // User form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  
  const handleGenerateUser = () => {
    const generatedEmail = `user${Date.now()}@cyberprobes.com`;
    const generatedPassword = generateRandomPassword();
    
    setUserForm(prev => ({
      ...prev,
      email: generatedEmail,
      password: generatedPassword
    }));
    
    setGeneratedCredentials({
      email: generatedEmail,
      password: generatedPassword
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      if (isEditing) {
        // Update existing user - you can implement this part later
        setUsers(prev => prev.map(user => 
          user.id === userForm.id ? { 
            ...userForm, 
            id: user.id,
            createdAt: user.createdAt 
          } as User : user
        ));
        
        // You can add API call for update here
      } else {
        // Create new user via API
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: userForm.name,
            email: userForm.email,
            password: userForm.password,
            role: userForm.role
          })
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to create user');
        }
        
        // Refresh the users list from the server
        await fetchUsers();
        
        // Show success message
        setSuccess('User created successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
      
      // Reset form
      setUserForm({
        name: '',
        email: '',
        password: '',
        role: 'USER'
      });
      setShowForm(false);
      setIsEditing(false);
      setGeneratedCredentials(null);
    } catch (error) {
      console.error('Error submitting user:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBulkGenerate = () => {
    const newUsers: UserCredentials[] = [];
    
    for (let i = 0; i < bulkUserCount; i++) {
      const timestamp = Date.now() + i;
      const email = `${bulkUserPrefix}${timestamp}@cyberprobes.com`;
      const password = generateRandomPassword();
      
      newUsers.push({ email, password });
    }
    
    setBulkGeneratedUsers(newUsers);
  };
  
  const handleBulkCreate = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      let successCount = 0;
      
      // Create each user via API
      for (const credentials of bulkGeneratedUsers) {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: `${bulkUserPrefix.charAt(0).toUpperCase() + bulkUserPrefix.slice(1)}`,
            email: credentials.email,
            password: credentials.password,
            role: bulkUserRole
          })
        });
        
        if (response.ok) {
          successCount++;
        }
      }
      
      if (successCount > 0) {
        // Refresh the users list from the server
        await fetchUsers();
        
        // Show success message
        setSuccess(`${successCount} users created successfully!`);
        setTimeout(() => setSuccess(''), 3000);
      }
      
      // Reset the bulk form
      setBulkUserCount(5);
      setBulkUserPrefix('user');
      setBulkUserRole('USER');
      setBulkGeneratedUsers([]);
      setShowBulkForm(false);
    } catch (error) {
      console.error('Error creating bulk users:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportCredentials = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Password\n" 
      + bulkGeneratedUsers.map(user => `${user.email},${user.password}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_credentials.csv");
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
  };
  
  const editUser = (id: string) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setUserForm({
        ...userToEdit,
        password: '' // Don't show password for editing
      });
      setShowForm(true);
      setIsEditing(true);
    }
  };
  
  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };
  
  if (status === 'loading' || isLoadingUsers) {
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
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-gray-200">Create, update and manage user accounts</p>
            </div>
            <Link href="/dashboard/admin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {/* Add success message */}
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
              {success}
            </div>
          )}
          
          {/* Add error message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Users</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowBulkForm(true);
                  setShowForm(false);
                  setBulkGeneratedUsers([]);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Bulk Create Users
              </button>
              <button
                onClick={() => {
                  setUserForm({
                    name: '',
                    email: '',
                    password: '',
                    role: 'USER'
                  });
                  setIsEditing(false);
                  setShowForm(true);
                  setShowBulkForm(false);
                  setGeneratedCredentials(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add New User
              </button>
            </div>
          </div>
          
          {/* Bulk User Creation Form */}
          {showBulkForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Bulk Create Users</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="bulkUserCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Users
                  </label>
                  <input
                    type="number"
                    id="bulkUserCount"
                    min="1"
                    max="100"
                    value={bulkUserCount}
                    onChange={(e) => setBulkUserCount(parseInt(e.target.value) || 5)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="bulkUserPrefix" className="block text-sm font-medium text-gray-700 mb-1">
                    Username Prefix
                  </label>
                  <input
                    type="text"
                    id="bulkUserPrefix"
                    value={bulkUserPrefix}
                    onChange={(e) => setBulkUserPrefix(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email pattern will be: {bulkUserPrefix}TIMESTAMP@cyberprobes.com
                  </p>
                </div>
                
                <div>
                  <label htmlFor="bulkUserRole" className="block text-sm font-medium text-gray-700 mb-1">
                    User Role
                  </label>
                  <select
                    id="bulkUserRole"
                    value={bulkUserRole}
                    onChange={(e) => setBulkUserRole(e.target.value as 'USER' | 'ADMIN')}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleBulkGenerate}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Generate Credentials
                  </button>
                  
                  {bulkGeneratedUsers.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleBulkCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Create All Users
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleExportCredentials}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Export Credentials (CSV)
                      </button>
                    </>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => setShowBulkForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              
              {/* Display bulk generated credentials */}
              {bulkGeneratedUsers.length > 0 && (
                <div className="mt-6 border border-green-300 bg-green-50 rounded-lg overflow-hidden">
                  <div className="p-4 bg-green-100 border-b border-green-300">
                    <h4 className="text-lg font-semibold text-green-800">Generated User Credentials</h4>
                    <p className="text-sm text-green-700">
                      {bulkGeneratedUsers.length} users generated. Save or export these credentials as they will not be displayed again.
                    </p>
                  </div>
                  
                  <div className="p-4 max-h-80 overflow-y-auto">
                    <table className="min-w-full divide-y divide-green-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Password</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-200">
                        {bulkGeneratedUsers.map((user, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-green-800">{index + 1}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-green-800">{user.email}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-green-800">{user.password}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Single User Form */}
          {showForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit User' : 'Create New User'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userForm.name}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {isEditing ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleFormChange}
                      {...(isEditing ? {} : { required: true })}
                      className="w-full p-2 border border-gray-300 rounded pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={userForm.role}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                
                <div className="flex gap-4 pt-2">
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={handleGenerateUser}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                    >
                      Generate Credentials
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    {isEditing ? 'Update User' : 'Create User'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setIsEditing(false);
                      setGeneratedCredentials(null);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              {generatedCredentials && (
                <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Generated Credentials</h4>
                  <p className="text-sm mb-1"><strong>Email:</strong> {generatedCredentials.email}</p>
                  <div className="flex items-center mb-3">
                    <strong className="text-sm mr-2">Password:</strong>
                    <span className="text-sm font-mono">{generatedCredentials.password}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedCredentials.password);
                        alert('Password copied to clipboard');
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      title="Copy password"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Please save these credentials or share them with the user. For security reasons, the password will not be displayed again.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => editUser(user.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
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
      </div>
    </div>
  );
} 