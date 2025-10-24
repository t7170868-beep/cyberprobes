'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : '';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CyberProbes
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className={`text-gray-600 hover:text-blue-600 ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/about" className={`text-gray-600 hover:text-blue-600 ${isActive('/about')}`}>
              About Us
            </Link>
            <Link href="/services" className={`text-gray-600 hover:text-blue-600 ${isActive('/services')}`}>
              Services
            </Link>
            <Link href="/blog" className={`text-gray-600 hover:text-blue-600 ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link href="/contact" className={`text-gray-600 hover:text-blue-600 ${isActive('/contact')}`}>
              Contact
            </Link>
            
            {session ? (
              <>
                <Link href="/dashboard" className={`text-gray-600 hover:text-blue-600 ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className={`text-gray-600 hover:text-blue-600 ${isActive('/auth/login')}`}>
                Login / Register
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-600 hover:text-blue-600"
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
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link 
                href="/"
                className={`text-gray-600 hover:text-blue-600 ${isActive('/')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about"
                className={`text-gray-600 hover:text-blue-600 ${isActive('/about')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services"
                className={`text-gray-600 hover:text-blue-600 ${isActive('/services')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/blog"
                className={`text-gray-600 hover:text-blue-600 ${isActive('/blog')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact"
                className={`text-gray-600 hover:text-blue-600 ${isActive('/contact')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`text-gray-600 hover:text-blue-600 ${isActive('/dashboard')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-blue-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth/login" 
                  className={`text-gray-600 hover:text-blue-600 ${isActive('/auth/login')}`}
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