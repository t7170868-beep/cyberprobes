'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Something went wrong!
          </h1>
          <p style={{
            color: '#6b7280',
            marginBottom: '1.5rem'
          }}>
            An unexpected error has occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
} 