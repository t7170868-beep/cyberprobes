'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  users: number;
  videos: number;
  courses: number;
  blogs: number;
  payments: number;
  revenue: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    videos: 0,
    courses: 0,
    blogs: 0,
    payments: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status, router]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all stats in parallel
      const [usersRes, videosRes, coursesRes, blogsRes, paymentsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/videos'),
        fetch('/api/courses'),
        fetch('/api/blogs'),
        fetch('/api/payments'),
      ]);

      const users = usersRes.ok ? await usersRes.json() : [];
      const videos = videosRes.ok ? await videosRes.json() : [];
      const courses = coursesRes.ok ? await coursesRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];
      const payments = paymentsRes.ok ? await paymentsRes.json() : [];

      const completedPayments = payments.filter((p: any) => p.status === 'completed');
      const revenue = completedPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

      setStats({
        users: users.length || 0,
        videos: videos.length || 0,
        courses: courses.length || 0,
        blogs: blogs.length || 0,
        payments: payments.length || 0,
        revenue: revenue || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 font-rajdhani">Manage users, courses, videos, blog posts, and other website content.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Users</p>
              <h3 className="text-3xl font-orbitron font-bold text-cyber-blue">{stats.users}</h3>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Courses</p>
              <h3 className="text-3xl font-orbitron font-bold text-neon-green">{stats.courses}</h3>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Videos</p>
              <h3 className="text-3xl font-orbitron font-bold text-neon-purple">{stats.videos}</h3>
            </div>
            <div className="text-4xl">🎥</div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Blog Posts</p>
              <h3 className="text-3xl font-orbitron font-bold text-red-400">{stats.blogs}</h3>
            </div>
            <div className="text-4xl">✍️</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Payments</p>
              <h3 className="text-3xl font-orbitron font-bold text-yellow-400">{stats.payments}</h3>
            </div>
            <div className="text-4xl">💳</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400 font-rajdhani mb-2">Total Revenue</p>
              <h3 className="text-3xl font-orbitron font-bold text-neon-green">₹{stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>
          
      {/* Management Modules */}
      <div>
        <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Management Modules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/dashboard/admin/courses" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Course Management</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Create, edit, and manage courses with materials</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Manage →</span>
          </Link>
          
          <Link href="/dashboard/admin/videos" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Video Management</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Upload and manage course videos</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Manage →</span>
          </Link>
          
          <Link href="/dashboard/admin/users" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">User Management</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Create, edit, and manage user accounts</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Manage →</span>
          </Link>
          
          <Link href="/dashboard/admin/payments" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Payment Reports</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">View and verify payment transactions</p>
            <span className="text-cyber-blue font-rajdhani font-medium">View →</span>
          </Link>
          
          <Link href="/dashboard/admin/blogs" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Blog Management</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Write, edit, and publish blog posts</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Manage →</span>
          </Link>
          
          <Link href="/dashboard/admin/updates" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Updates & Notifications</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Manage platform updates and announcements</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Manage →</span>
          </Link>
          
          <Link href="/dashboard/admin/settings" className="glass-card p-6 rounded-xl border border-gray-700 hover:border-cyber-blue transition-all group">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">Settings</h3>
            <p className="text-gray-400 font-rajdhani text-sm mb-4">Configure system and payment settings</p>
            <span className="text-cyber-blue font-rajdhani font-medium">Configure →</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 