'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
// import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    return pathname === path ? 'text-cyber-blue glow-border' : 'text-gray-300 hover:text-cyber-blue';
  };

  // const toggleTheme = () => {
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  // };

  return (
    <header className="glass-card border-b border-glass-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 magnetic-button">
              <div className="w-10 h-10 glow-border rounded-lg flex items-center justify-center relative overflow-hidden">
                <span className="font-orbitron font-bold text-lg cyber-text">C</span>
                <div className="absolute inset-0 bg-cyber-blue opacity-10 animate-pulse"></div>
              </div>
              <span className="font-orbitron text-xl font-bold cyber-text">CyberProbes</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link href="/" className={`font-rajdhani font-medium transition-all duration-300 ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/about" className={`font-rajdhani font-medium transition-all duration-300 ${isActive('/about')}`}>
                About Us
              </Link>
              <Link href="/services" className={`font-rajdhani font-medium transition-all duration-300 ${isActive('/services')}`}>
                Services
              </Link>
              <Link href="/blog" className={`font-rajdhani font-medium transition-all duration-300 ${isActive('/blog')}`}>
                Blog
              </Link>
              <Link href="/contact" className={`font-rajdhani font-medium transition-all duration-300 ${isActive('/contact')}`}>
                Contact
              </Link>
              
              {session ? (
                <>
                  <Link href="/dashboard" className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/dashboard')}`}>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/cases" className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/dashboard/cases')}`}>
                    Cases
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/auth/login')}`}>
                  Login / Register
                </Link>
              )}
            </nav>
            
            {/* Theme toggle button removed temporarily */}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle button removed temporarily */}

            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link 
                href="/" 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/about')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/services')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/blog" 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/blog')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/contact')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/dashboard')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/cases" 
                    className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/dashboard/cases')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cases
                  </Link>
                  <button 
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth/login" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive('/auth/login')}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 