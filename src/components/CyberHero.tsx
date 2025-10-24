'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CyberHero() {
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createNodes = () => {
      if (!nodesRef.current) return;
      
      // Clear existing nodes
      nodesRef.current.innerHTML = '';
      
      // Create 20 moving nodes
      for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 15 + 's';
        node.style.animationDuration = (15 + Math.random() * 10) + 's';
        nodesRef.current.appendChild(node);
      }
    };

    createNodes();
    
    // Recreate nodes periodically for continuous effect
    const interval = setInterval(createNodes, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const createDataStreams = () => {
      const container = document.querySelector('.data-streams-container');
      if (!container) return;
      
      container.innerHTML = '';
      
      // Create 15 data streams
      for (let i = 0; i < 15; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = Math.random() * 100 + '%';
        stream.style.height = (100 + Math.random() * 200) + 'px';
        stream.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(stream);
      }
    };

    createDataStreams();
    const interval = setInterval(createDataStreams, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center cyber-grid matrix-bg overflow-hidden">
      {/* Moving Nodes */}
      <div ref={nodesRef} className="moving-nodes"></div>
      
      {/* Data Streams */}
      <div className="data-streams-container absolute inset-0 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Cyber Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
              <span className="font-rajdhani text-sm uppercase tracking-wider text-cyber-blue">
                Digital Forensics Experts
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="cyber-text cyber-glow">CyberProbes</span>
              <br />
              <span className="text-white font-rajdhani font-light text-2xl sm:text-3xl lg:text-4xl">
                Digital Forensics & Incident Response
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="font-rajdhani text-xl sm:text-2xl lg:text-3xl text-cyber-blue mb-4 cyber-glow">
              "We Analyze the Truth in Every Byte."
            </p>
            
            {/* Description */}
            <p className="font-inter text-lg text-gray-300 mb-8 max-w-2xl">
              24×7 cyber investigation, threat analysis, and evidence preservation. 
              Professional digital forensics and cybersecurity services to protect your business 
              from evolving cyber threats.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/contact"
                className="magnetic-button glass-button px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-white hover:text-black transition-colors"
              >
                <span className="relative z-10">Request Forensic Analysis</span>
              </Link>
              <Link
                href="/services"
                className="magnetic-button glow-border px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-cyber-blue hover:text-white transition-colors"
              >
                <span className="relative z-10">Book Security Audit</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="font-orbitron text-2xl font-bold cyber-text">150+</div>
                <div className="font-inter text-sm text-gray-400">Cases Solved</div>
                <div className="cyber-progress mt-2"></div>
              </div>
              <div className="text-center">
                <div className="font-orbitron text-2xl font-bold cyber-text">24/7</div>
                <div className="font-inter text-sm text-gray-400">Response</div>
                <div className="cyber-progress mt-2"></div>
              </div>
              <div className="text-center">
                <div className="font-orbitron text-2xl font-bold cyber-text">98%</div>
                <div className="font-inter text-sm text-gray-400">Success Rate</div>
                <div className="cyber-progress mt-2"></div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Glowing Frame */}
              <div className="absolute -inset-4 glow-border rounded-2xl"></div>
              
              {/* Image Container */}
              <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                <div className="relative h-80 sm:h-96 lg:h-[500px] w-full">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Cyber Security Analysis"
                    className="rounded-lg object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg"></div>
                  
                  {/* Scanning Line Effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute w-full h-0.5 bg-cyber-blue shadow-[0_0_10px_var(--cyber-blue)] animate-pulse"></div>
                  </div>
                </div>
                
                {/* Tech Overlay */}
                <div className="absolute top-4 right-4 glass-card px-3 py-2 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="font-rajdhani text-xs text-neon-green">ANALYZING</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 glass-card p-3 rounded-lg animate-bounce">
              <div className="font-orbitron text-xs text-cyber-blue">SECURE</div>
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card p-3 rounded-lg animate-bounce" style={{animationDelay: '1s'}}>
              <div className="font-orbitron text-xs text-neon-green">VERIFIED</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-rajdhani text-sm text-gray-400">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
