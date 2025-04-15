'use client';

import { CSSProperties } from 'react';

interface PlaceholderImageProps {
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export default function PlaceholderImage({
  alt,
  width = '100%',
  height = '100%',
  className = '',
  style = {},
}: PlaceholderImageProps) {
  // Generate a gradient background with the first letter of the alt text
  const letter = alt.charAt(0).toUpperCase();
  
  const combinedStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    width,
    height,
    borderRadius: '0.5rem',
    ...style,
  };

  return (
    <div className={className} style={combinedStyle} role="img" aria-label={alt}>
      {letter}
    </div>
  );
} 