'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  status: 'submitted' | 'under_analysis' | 'evidence_collected' | 'report_ready' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  submittedDate: string;
  estimatedCompletion: string;
  assignedAnalyst: string;
  description: string;
  evidenceCount: number;
  progress: number;
}

const statusConfig = {
  submitted: { label: 'Submitted', color: 'bg-blue-500', icon: '📝' },
  under_analysis: { label: 'Under Analysis', color: 'bg-yellow-500', icon: '🔍' },
  evidence_collected: { label: 'Evidence Collected', color: 'bg-purple-500', icon: '🗂️' },
  report_ready: { label: 'Report Ready', color: 'bg-green-500', icon: '📋' },
  completed: { label: 'Completed', color: 'bg-gray-500', icon: '✅' }
};

const priorityConfig = {
  low: { label: 'Low', color: 'text-green-600 bg-green-100' },
  medium: { label: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
  high: { label: 'High', color: 'text-orange-600 bg-orange-100' },
  critical: { label: 'Critical', color: 'text-red-600 bg-red-100' }
};

export default function CasesPage() {
  const { data: session } = useSession();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Fetch cases from API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/cases');
        if (response.ok) {
          const apiCases = await response.json();
          // Transform API data to match our interface
          const transformedCases: Case[] = apiCases.map((apiCase: any) => ({
            id: apiCase.id,
            caseNumber: apiCase.caseNumber,
            title: apiCase.title,
            status: apiCase.status.toLowerCase().replace('_', '_') as Case['status'],
            priority: apiCase.priority.toLowerCase() as Case['priority'],
            submittedDate: new Date(apiCase.createdAt).toISOString().split('T')[0],
            estimatedCompletion: apiCase.estimatedCompletion ? new Date(apiCase.estimatedCompletion).toISOString().split('T')[0] : '',
            assignedAnalyst: apiCase.assignedAnalyst || 'Unassigned',
            description: apiCase.description,
            evidenceCount: apiCase.evidenceFiles?.length || 0,
            progress: apiCase.progress || 0
          }));
          setCases(transformedCases);
        } else {
          // Fallback to mock data if API fails
          const mockCases: Case[] = [
            {
              id: '1',
              caseNumber: 'CF-2024-001',
              title: 'Ransomware Investigation - TechCorp',
              status: 'under_analysis',
              priority: 'critical',
              submittedDate: '2024-01-15',
              estimatedCompletion: '2024-01-25',
              assignedAnalyst: 'John Smith',
              description: 'Investigation of ransomware attack on corporate network affecting 200+ workstations.',
              evidenceCount: 15,
              progress: 65
            },
            {
              id: '2',
              caseNumber: 'CF-2024-002',
              title: 'Data Breach Analysis - Healthcare Inc',
              status: 'evidence_collected',
              priority: 'high',
              submittedDate: '2024-01-10',
              estimatedCompletion: '2024-01-20',
              assignedAnalyst: 'Sarah Johnson',
              description: 'Analysis of potential data breach involving patient records.',
              evidenceCount: 8,
              progress: 85
            }
          ];
          setCases(mockCases);
        }
      } catch (error) {
        console.error('Error fetching cases:', error);
        // Fallback to empty array
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const getStatusSteps = (currentStatus: string) => {
    const steps = ['submitted', 'under_analysis', 'evidence_collected', 'report_ready', 'completed'];
    const currentIndex = steps.indexOf(currentStatus);
    
    return steps.map((step, index) => ({
      ...statusConfig[step as keyof typeof statusConfig],
      isActive: index <= currentIndex,
      isCurrent: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Incident Response Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track the status of your forensic investigations in real-time
              </p>
            </div>
            <Link
              href="/dashboard/cases/submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition glow-on-hover"
            >
              Submit New Case
            </Link>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCase(case_)}
            >
              <div className="p-6">
                {/* Case Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {case_.caseNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {case_.title}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[case_.priority].color}`}>
                    {priorityConfig[case_.priority].label}
                  </span>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{statusConfig[case_.status].icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {statusConfig[case_.status].label}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${statusConfig[case_.status].color} transition-all duration-500`}
                      style={{ width: `${case_.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {case_.progress}% Complete
                  </p>
                </div>

                {/* Case Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Analyst:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{case_.assignedAnalyst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Evidence:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{case_.evidenceCount} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ETA:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {new Date(case_.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Detail Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedCase.caseNumber}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{selectedCase.title}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Status Timeline */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investigation Progress</h3>
                  <div className="flex items-center justify-between">
                    {getStatusSteps(selectedCase.status).map((step, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          step.isActive ? step.color : 'bg-gray-300 dark:bg-gray-600'
                        } ${step.isCurrent ? 'ring-4 ring-blue-200 dark:ring-blue-800' : ''}`}>
                          <span className="text-sm">{step.icon}</span>
                        </div>
                        <p className={`text-xs mt-2 text-center ${
                          step.isActive ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {step.label}
                        </p>
                        {index < getStatusSteps(selectedCase.status).length - 1 && (
                          <div className={`absolute h-0.5 w-full mt-5 ${
                            step.isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`} style={{ left: '50%', right: '-50%' }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Case Details</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
                        <p className="text-gray-900 dark:text-white">{selectedCase.description}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Priority</label>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${priorityConfig[selectedCase.priority].color}`}>
                          {priorityConfig[selectedCase.priority].label}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Assigned Analyst</label>
                        <p className="text-gray-900 dark:text-white">{selectedCase.assignedAnalyst}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Timeline</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Submitted</label>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(selectedCase.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Estimated Completion</label>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(selectedCase.estimatedCompletion).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Evidence Items</label>
                        <p className="text-gray-900 dark:text-white">{selectedCase.evidenceCount} items collected</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition">
                    Download Report
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                    Contact Analyst
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
