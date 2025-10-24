'use client';

import { useState, useEffect } from 'react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  tools: string[];
  color: string;
  bgColor: string;
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Identification',
    description: 'Locate and identify potential sources of digital evidence',
    icon: '🔍',
    tools: ['EnCase', 'FTK Imager', 'MSAB XRY', 'Cellebrite UFED'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    duration: '2-4 hours'
  },
  {
    id: 2,
    title: 'Preservation',
    description: 'Secure and preserve evidence using forensically sound methods',
    icon: '🛡️',
    tools: ['Write Blockers', 'Hash Verification', 'Chain of Custody', 'Secure Storage'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    duration: '1-2 hours'
  },
  {
    id: 3,
    title: 'Analysis',
    description: 'Examine and analyze evidence using advanced forensic tools',
    icon: '🔬',
    tools: ['Autopsy', 'Volatility', 'Wireshark', 'X-Ways Forensics'],
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    duration: '8-24 hours'
  },
  {
    id: 4,
    title: 'Reporting',
    description: 'Deliver comprehensive reports with findings and recommendations',
    icon: '📋',
    tools: ['Report Templates', 'Evidence Documentation', 'Legal Compliance', 'Expert Testimony'],
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    duration: '4-8 hours'
  }
];

export default function ForensicProcessVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(prev => (prev + 1) % processSteps.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleStepClick = (stepIndex: number) => {
    setAutoPlay(false);
    setIsAnimating(true);
    setTimeout(() => {
      setActiveStep(stepIndex);
      setIsAnimating(false);
    }, 300);
  };

  const currentStep = processSteps[activeStep];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Digital Forensic Process
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our systematic approach ensures thorough investigation and legally admissible evidence
        </p>
      </div>

      {/* Process Timeline */}
      <div className="relative mb-12">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Circles */}
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative z-10">
              <button
                onClick={() => handleStepClick(index)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 transform hover:scale-110 ${
                  index <= activeStep
                    ? `${step.bgColor} ${step.color} ring-4 ring-white dark:ring-gray-800 shadow-lg`
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                } ${index === activeStep ? 'animate-pulse scale-110' : ''}`}
              >
                {step.icon}
              </button>
              
              {/* Step Number */}
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold ${
                index <= activeStep ? step.color : 'text-gray-400 dark:text-gray-500'
              }`}>
                Step {step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Details */}
      <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step Information */}
          <div>
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-full ${currentStep.bgColor} ${currentStep.color} flex items-center justify-center text-xl mr-4`}>
                {currentStep.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Duration: {currentStep.duration}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {currentStep.description}
            </p>

            {/* Key Activities */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Activities
              </h4>
              <div className="space-y-2">
                {currentStep.id === 1 && (
                  <>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Survey the incident scene and affected systems
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Document system configurations and network topology
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Identify potential evidence sources and data types
                    </div>
                  </>
                )}
                {currentStep.id === 2 && (
                  <>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Create forensic images using write-blocking hardware
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Generate and verify cryptographic hashes
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Maintain strict chain of custody documentation
                    </div>
                  </>
                )}
                {currentStep.id === 3 && (
                  <>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Recover deleted files and hidden data
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Analyze system logs and network traffic
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Reconstruct timeline of events and user activities
                    </div>
                  </>
                )}
                {currentStep.id === 4 && (
                  <>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Compile comprehensive technical findings
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Prepare executive summary and recommendations
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Ensure legal compliance and court admissibility
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tools and Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tools & Technologies
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentStep.tools.map((tool, index) => (
                <div
                  key={index}
                  className={`${currentStep.bgColor} ${currentStep.color} p-3 rounded-lg text-center font-medium transition-all duration-300 hover:scale-105 cursor-pointer`}
                >
                  {tool}
                </div>
              ))}
            </div>

            {/* Process Metrics */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Process Metrics</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Completion Rate:</span>
                  <span className="font-semibold text-green-600">99.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Average Duration:</span>
                  <span className="font-semibold text-blue-600">{currentStep.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Success Rate:</span>
                  <span className="font-semibold text-purple-600">98.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Court Admissibility:</span>
                  <span className="font-semibold text-red-600">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            autoPlay 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {autoPlay ? '⏸️ Pause' : '▶️ Play'}
        </button>
        
        <div className="flex space-x-2">
          {processSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === activeStep 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Legal Compliance Notice */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h6 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
              Legal Compliance & Standards
            </h6>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Our forensic process follows international standards including ISO/IEC 27037, NIST SP 800-86, 
              and RFC 3227. All evidence handling maintains strict chain of custody for legal admissibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
