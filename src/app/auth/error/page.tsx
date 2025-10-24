'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Loading fallback component
function AuthErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600 mb-6">
            Please wait while we prepare the page.
          </p>
        </div>
      </div>
    </div>
  )
}

// Map error codes to user-friendly messages
const errorMessages: Record<string, string> = {
  'CredentialsSignin': 'The email or password you entered is incorrect. Please try again.',
  'SessionRequired': 'You need to be signed in to access this page.',
  'AccessDenied': 'You do not have permission to access this resource.',
  'EmailSignin': 'There was a problem sending the login email. Please try again.',
  'OAuthSignin': 'There was a problem signing in with this provider.',
  'OAuthCallback': 'There was a problem with the authentication callback.',
  'OAuthCreateAccount': 'There was a problem creating your account.',
  'EmailCreateAccount': 'There was a problem creating your account.',
  'Callback': 'There was a problem with the authentication callback.',
  'OAuthAccountNotLinked': 'This email is already associated with another account.',
  'Configuration': 'There is a problem with the server configuration.',
  'Verification': 'The verification token has expired or has already been used.',
  'Default': 'An authentication error occurred. Please try again.'
};

// Actual error content component
function AuthErrorContent() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>(errorMessages['Default'])
  const [errorType, setErrorType] = useState<string>('Default')
  
  useEffect(() => {
    const error = searchParams.get('error')
    
    if (error && error in errorMessages) {
      setErrorMessage(errorMessages[error])
      setErrorType(error)
    } else if (error) {
      setErrorMessage(`Authentication error: ${error}`)
      setErrorType('Custom')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">
            {errorMessage}
          </p>
          
          {/* Show different guidance based on error type */}
          {errorType === 'CredentialsSignin' && (
            <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Possible solutions:</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Double-check that you've entered the correct email address</li>
                <li>Make sure your password is correct (remember it's case sensitive)</li>
                <li>If you've forgotten your password, use the "Forgot Password" option</li>
              </ul>
            </div>
          )}
          
          {errorType === 'SessionRequired' && (
            <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Please note:</h3>
              <p className="text-gray-600">
                You need to be logged in to access this page. Please sign in with your account credentials.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
              Back to Login
            </Link>
            <Link href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={<AuthErrorFallback />}>
      <AuthErrorContent />
    </Suspense>
  )
} 