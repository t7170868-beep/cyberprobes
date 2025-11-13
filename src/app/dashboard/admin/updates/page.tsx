'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Update {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'offer' | 'new_course' | 'maintenance';
  published: boolean;
  createdAt: string;
}

export default function AdminUpdatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateForm, setUpdateForm] = useState<Omit<Update, 'id' | 'createdAt'>>({
    title: '',
    message: '',
    type: 'announcement',
    published: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated') {
      fetchUpdates();
    }
  }, [status, router]);

  const fetchUpdates = async () => {
    try {
      setIsLoading(true);
      // In a real app, fetch from API
      // const response = await fetch('/api/admin/updates');
      // const data = await response.json();
      // setUpdates(data);
      setUpdates([]);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, save to API
      // const response = await fetch('/api/admin/updates', {
      //   method: isEditing ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updateForm),
      // });
      // if (!response.ok) throw new Error('Failed to save update');
      
      setShowForm(false);
      setIsEditing(false);
      setUpdateForm({ title: '', message: '', type: 'announcement', published: false });
      fetchUpdates();
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Failed to save update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update?')) return;
    try {
      // In a real app, delete from API
      // const response = await fetch(`/api/admin/updates/${id}`, { method: 'DELETE' });
      // if (!response.ok) throw new Error('Failed to delete update');
      fetchUpdates();
    } catch (error) {
      console.error('Error deleting update:', error);
      alert('Failed to delete update');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-orbitron font-bold text-white">Platform Updates & Notifications</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setUpdateForm({ title: '', message: '', type: 'announcement', published: false });
          }}
          className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg font-rajdhani font-semibold transition-colors"
        >
          + Add Update
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-orbitron font-semibold text-white mb-4">
            {isEditing ? 'Edit Update' : 'Create New Update'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={updateForm.title}
                onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Type
              </label>
              <select
                value={updateForm.type}
                onChange={(e) => setUpdateForm({ ...updateForm, type: e.target.value as Update['type'] })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
              >
                <option value="announcement">Announcement</option>
                <option value="offer">Special Offer</option>
                <option value="new_course">New Course</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={updateForm.message}
                onChange={(e) => setUpdateForm({ ...updateForm, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={updateForm.published}
                onChange={(e) => setUpdateForm({ ...updateForm, published: e.target.checked })}
                className="w-4 h-4 text-cyber-blue bg-gray-800 border-gray-700 rounded focus:ring-cyber-blue"
              />
              <label htmlFor="published" className="ml-2 text-sm font-rajdhani text-gray-300">
                Publish immediately
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg font-rajdhani font-semibold transition-colors"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-rajdhani font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {updates.length === 0 ? (
          <div className="glass-card p-12 rounded-xl border border-gray-700 text-center">
            <p className="text-gray-400 font-rajdhani">No updates yet. Create your first update!</p>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="glass-card p-6 rounded-xl border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-orbitron font-semibold text-white mb-2">{update.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${
                    update.type === 'announcement' ? 'bg-cyber-blue/20 text-cyber-blue' :
                    update.type === 'offer' ? 'bg-neon-green/20 text-neon-green' :
                    update.type === 'new_course' ? 'bg-neon-purple/20 text-neon-purple' :
                    'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {update.type}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setUpdateForm(update);
                      setIsEditing(true);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white transition-colors text-sm font-rajdhani"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(update.id)}
                    className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors text-sm font-rajdhani"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-300 font-rajdhani mb-2">{update.message}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{new Date(update.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded ${update.published ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-700 text-gray-400'}`}>
                  {update.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

