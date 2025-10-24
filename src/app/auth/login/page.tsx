'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Check for error from URL on component load
  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError) {
      switch (urlError) {
        case 'CredentialsSignin':
          setError('Invalid email or password. Please try again.');
          break;
        case 'SessionRequired':
          setError('You need to be signed in to access that page.');
          break;
        default:
          setError(`Login error: ${urlError}`);
      }
    }
  }, [searchParams]);
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };
  
  const validateForm = () => {
    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError('Email and password are required');
      return false;
    }
    
    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(loginData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log("Attempting login with:", loginData.email);
      
      const result = await signIn('credentials', {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
        callbackUrl: '/dashboard'
      });
      
      console.log("Login result:", result);
      
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(`Login failed: ${result.error}`);
        }
      } else if (result?.url) {
        console.log("Login successful, redirecting to:", result.url);
        router.push(result.url);
      } else {
        // Fallback in case of an unexpected response
        console.error("Unexpected sign-in response:", result);
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(`An error occurred during login. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 pr-10"
                  placeholder="Your password"
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
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  Forgot Password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Contact your administrator to create an account.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white py-4 px-6">
            <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
          </div>
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
} 