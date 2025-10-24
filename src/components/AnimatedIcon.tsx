'use client';

import { useEffect, useRef } from 'react';

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedIcon({ children, delay = 0, className = '' }: AnimatedIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-bounce');
              entry.target.classList.add('text-cyber-blue');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iconRef.current) {
      observer.observe(iconRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={iconRef}
      className={`transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}
