'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    // Magnetic button effects
    const handleMouseMove = (e: MouseEvent) => {
      const magneticButtons = document.querySelectorAll('.magnetic-button');
      
      magneticButtons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const moveX = x * strength * 0.3;
          const moveY = y * strength * 0.3;
          
          (button as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.1})`;
        } else {
          (button as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
