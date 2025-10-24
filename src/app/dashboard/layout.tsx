'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@prisma/client';

interface LayoutProps {
  children: ReactNode;
}

interface NavLinkProps {
  href: string;
  icon: React.ReactElement;
  text: string;
  active: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, icon, text, active, onClick }: NavLinkProps) => (
  <Link 
    href={href}
    className={`flex items-center space-x-3 p-3 rounded-lg transition ${
      active 
        ? 'bg-blue-700 text-white' 
        : 'text-gray-300 hover:bg-blue-800 hover:text-white'
    }`}
    onClick={onClick}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default function DashboardLayout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Only run this effect on client
  useEffect(() => {
    // Check if user is authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    // Check if user is admin (in a real app, this would check the user's role from session)
    if (session?.user) {
      const user = session.user as unknown as User;
      setIsAdmin(user.role === 'ADMIN');
    }
  }, [status, session, router]);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      // The redirect will be handled by the signOut function's callbackUrl
      // No need to manually redirect, which could cause race conditions
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback in case signOut fails
      router.push('/');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-blue-800">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-white font-bold text-xl">CyberProbes</span>
            </Link>
            <button 
              className="lg:hidden text-white" 
              onClick={() => setSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <NavLink 
              href="/dashboard" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              } 
              text="Dashboard" 
              active={pathname === '/dashboard'}
            />

            {isAdmin && (
              <>
                <div className="pt-4 pb-2">
                  <p className="text-gray-400 text-xs uppercase font-semibold px-3">Admin</p>
                </div>
                
                <NavLink 
                  href="/dashboard/admin" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  } 
                  text="Admin Dashboard" 
                  active={pathname === '/dashboard/admin'}
                />
                
                <NavLink 
                  href="/dashboard/admin/users" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  } 
                  text="User Management" 
                  active={pathname === '/dashboard/admin/users'}
                />
                
                <NavLink 
                  href="/dashboard/admin/blogs" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  } 
                  text="Blog Management" 
                  active={pathname === '/dashboard/admin/blogs'}
                />
                
                <NavLink 
                  href="/dashboard/admin/courses" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  } 
                  text="Course Management" 
                  active={pathname === '/dashboard/admin/courses'}
                />
              </>
            )}
            
            <div className="pt-4 pb-2">
              <p className="text-gray-400 text-xs uppercase font-semibold px-3">Account</p>
            </div>
            
            <NavLink 
              href="/dashboard/profile" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              } 
              text="My Profile" 
              active={pathname === '/dashboard/profile'}
            />
            
            <NavLink 
              href="#" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              } 
              text="Logout" 
              active={false}
              onClick={handleLogout}
            />
          </div>
          
          {/* User Info */}
          <div className="p-4 border-t border-blue-800">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">{session?.user?.name}</p>
                <p className="text-blue-300 text-sm">{isAdmin ? 'Administrator' : 'User'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button 
            className="text-gray-700" 
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-lg">CyberProbes</span>
          <div className="w-6"></div> {/* For symmetry */}
        </div>
        
        {/* Main Content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 