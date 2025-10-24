'use client';

import { useEffect, useRef, useState } from 'react';
import ToolTip from './ToolTip';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  tools: string[];
  color: string;
  glowColor: string;
  icon: string;
}

const forensicSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Identification",
    description: "Locate and identify potential digital evidence sources across all systems and devices.",
    tools: ["FTK Imager", "MSAB", "Cellebrite", "X-Ways"],
    color: "#00E5FF",
    glowColor: "rgba(0, 229, 255, 0.4)",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Preservation",
    description: "Create forensically sound copies and maintain chain of custody documentation.",
    tools: ["dd", "dcfldd", "Guymager", "PALADIN"],
    color: "#A94DFF",
    glowColor: "rgba(169, 77, 255, 0.4)",
    icon: "🛡️"
  },
  {
    id: 3,
    title: "Analysis",
    description: "Examine digital artifacts, recover deleted data, and reconstruct digital activities.",
    tools: ["EnCase", "Autopsy", "Volatility", "YARA"],
    color: "#00FFB3",
    glowColor: "rgba(0, 255, 179, 0.4)",
    icon: "🔬"
  },
  {
    id: 4,
    title: "Reporting",
    description: "Document findings, create detailed reports, and prepare evidence for legal proceedings.",
    tools: ["Report Lab", "Magnet AXIOM", "CaseMap", "TimelineJS"],
    color: "#FF4D4D",
    glowColor: "rgba(255, 77, 77, 0.4)",
    icon: "📋"
  }
];

export default function CyberForensicProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps in sequence
            forensicSteps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, step.id]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleStepHover = (stepId: number) => {
    setActiveStep(stepId);
  };

  const handleStepLeave = () => {
    setActiveStep(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary"
      style={{ zIndex: 10 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full mb-8">
            <div className="w-3 h-3 bg-cyber-blue rounded-full animate-pulse"></div>
            <span className="font-rajdhani text-sm uppercase tracking-wider text-cyber-blue">
              Digital Investigation Workflow
            </span>
          </div>
          
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold cyber-text mb-6 cyber-glow">
            Our Forensic Process
          </h2>
          
          <p className="font-rajdhani text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A systematic approach to digital evidence handling that ensures integrity, 
            admissibility, and comprehensive analysis in every investigation.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent transform -translate-y-1/2 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-neon-purple via-neon-green to-neon-pink opacity-50 animate-pulse"></div>
          </div>

          {forensicSteps.map((step, index) => {
            const isVisible = visibleSteps.includes(step.id);
            const isActive = activeStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`relative transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => handleStepHover(step.id)}
                onMouseLeave={handleStepLeave}
              >
                {/* Step Card */}
                <div className={`glass-card p-8 rounded-2xl h-full relative overflow-hidden group cursor-pointer transition-all duration-500 ${
                  isActive ? 'scale-105' : 'hover:scale-102'
                }`}>
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      boxShadow: `0 0 30px ${step.glowColor}, inset 0 0 30px ${step.glowColor}`
                    }}
                  ></div>

                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-6">
                    <div 
                      className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center font-orbitron text-2xl font-bold text-black relative overflow-hidden transition-all duration-500 ${
                        isActive ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        backgroundColor: step.color,
                        boxShadow: `0 0 20px ${step.glowColor}, 0 0 40px ${step.glowColor}`
                      }}
                    >
                      <span className="relative z-10">{step.id}</span>
                      
                      {/* Rotating Border */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{animationDuration: '3s'}}></div>
                      
                      {/* Pulse Ring */}
                      <div 
                        className={`absolute inset-0 rounded-full animate-ping ${isActive ? 'opacity-75' : 'opacity-0'}`}
                        style={{ backgroundColor: step.color }}
                      ></div>
                    </div>

                    {/* Icon */}
                    <div className="text-4xl text-center mt-4 filter drop-shadow-lg">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 
                      className="font-orbitron text-2xl font-bold mb-4 transition-colors duration-300"
                      style={{ color: isActive ? step.color : '#ffffff' }}
                    >
                      {step.title}
                    </h3>
                    
                    <p className="font-inter text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Tools */}
                    <div className="space-y-2">
                      <div className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider">
                        Key Tools:
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {step.tools.map((tool, toolIndex) => (
                          <ToolTip 
                            key={toolIndex}
                            content={`Professional forensic tool used in ${step.title.toLowerCase()} phase`}
                            position="bottom"
                          >
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-help ${
                                isActive 
                                  ? 'text-black' 
                                  : 'text-gray-300 bg-white/10'
                              }`}
                              style={{
                                backgroundColor: isActive ? step.color : undefined,
                                boxShadow: isActive ? `0 0 10px ${step.glowColor}` : undefined
                              }}
                            >
                              {tool}
                            </span>
                          </ToolTip>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        isVisible ? 'w-full' : 'w-0'
                      }`}
                      style={{ 
                        backgroundColor: step.color,
                        boxShadow: `0 0 10px ${step.glowColor}`
                      }}
                    ></div>
                  </div>

                  {/* Connecting Arrow (Mobile) */}
                  {index < forensicSteps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                      <div 
                        className="w-8 h-8 rotate-45 border-r-2 border-b-2 animate-bounce"
                        style={{ borderColor: step.color }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Step Connection Line (Desktop) */}
                {index < forensicSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 transform -translate-y-1/2 z-30">
                    <div 
                      className="w-full h-full rotate-45 border-r-2 border-b-2 animate-pulse"
                      style={{ borderColor: step.color }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-24">
          <div className="glass-card inline-block p-8 rounded-2xl">
            <h3 className="font-orbitron text-2xl font-bold cyber-text mb-4">
              Ready to Start Your Investigation?
            </h3>
            <p className="font-inter text-gray-300 mb-6 max-w-2xl">
              Our certified forensic experts are available 24/7 to handle your digital investigation needs 
              with precision and legal compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="magnetic-button glass-button px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-white hover:text-black transition-colors">
                <span className="relative z-10">Start Investigation</span>
              </button>
              <button className="magnetic-button glow-border px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-cyber-blue hover:text-white transition-colors">
                <span className="relative z-10">View Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue rounded-full opacity-30 animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
