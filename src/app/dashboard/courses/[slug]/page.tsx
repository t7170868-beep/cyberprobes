'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration?: string;
  materials: Array<{
    id: string;
    title: string;
    type: string;
    url: string;
    duration?: string;
    order: number;
  }>;
}

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  modules: CourseModule[];
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { slug } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }
    if (status === 'authenticated') {
      fetchCourse();
    }
  }, [slug, status, router]);

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      // Get all courses to find by slug
      const coursesRes = await fetch('/api/courses?published=true');
      const courses = await coursesRes.json();
      const foundCourse = courses.find((c: Course) => c.slug === slug);

      if (!foundCourse) {
        setError('Course not found');
        return;
      }

      // Check enrollment
      const enrollmentRes = await fetch(`/api/enrollments/check?courseId=${foundCourse.id}`);
      const enrollment = await enrollmentRes.json();

      if (!enrollment.enrolled) {
        router.push(`/courses/${slug}`);
        return;
      }

      // Get full course details
      const courseRes = await fetch(`/api/courses/${foundCourse.id}`);
      if (courseRes.ok) {
        const fullCourse = await courseRes.json();
        setCourse(fullCourse);
        if (fullCourse.modules && fullCourse.modules.length > 0) {
          const sortedModules = fullCourse.modules.sort((a: CourseModule, b: CourseModule) => a.order - b.order);
          setSelectedModule(sortedModules[0]);
          if (sortedModules[0].materials && sortedModules[0].materials.length > 0) {
            const sortedMaterials = sortedModules[0].materials.sort((a: any, b: any) => a.order - b.order);
            setSelectedMaterial(sortedMaterials[0].id);
          }
        }
      } else {
        setCourse(foundCourse);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-rajdhani text-gray-300">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 rounded-xl text-red-400 mb-8">{error || 'Course not found'}</div>
          <Link href="/dashboard" className="text-cyber-blue hover:text-neon-green">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const sortedModules = course.modules?.sort((a, b) => a.order - b.order) || [];
  const currentMaterial = selectedModule?.materials
    ?.sort((a, b) => a.order - b.order)
    .find(m => m.id === selectedMaterial);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-cyber-blue hover:text-neon-green font-rajdhani mb-1 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="font-orbitron text-xl md:text-2xl font-bold text-white">{course.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Module List */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl sticky top-24">
              <h2 className="font-orbitron text-lg font-bold text-white mb-4">Course Modules</h2>
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {sortedModules.map((module) => (
                  <div key={module.id}>
                    <button
                      onClick={() => {
                        setSelectedModule(module);
                        if (module.materials && module.materials.length > 0) {
                          const sorted = module.materials.sort((a, b) => a.order - b.order);
                          setSelectedMaterial(sorted[0].id);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedModule?.id === module.id
                          ? 'bg-cyber-blue/20 border border-cyber-blue text-white'
                          : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-cyber-blue/50'
                      }`}
                    >
                      <div className="font-rajdhani font-semibold text-sm mb-1">{module.title}</div>
                      {module.duration && (
                        <div className="text-xs text-gray-400">{module.duration}</div>
                      )}
                      {module.materials && (
                        <div className="text-xs text-gray-500 mt-1">
                          {module.materials.length} {module.materials.length === 1 ? 'lesson' : 'lessons'}
                        </div>
                      )}
                    </button>
                    {selectedModule?.id === module.id && module.materials && module.materials.length > 0 && (
                      <div className="mt-2 ml-4 space-y-1">
                        {module.materials
                          .sort((a, b) => a.order - b.order)
                          .map((material) => (
                            <button
                              key={material.id}
                              onClick={() => setSelectedMaterial(material.id)}
                              className={`w-full text-left p-2 rounded text-sm transition-all ${
                                selectedMaterial === material.id
                                  ? 'text-cyber-blue bg-cyber-blue/10'
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              <span className="mr-2">
                                {material.type === 'video' ? '▶' : material.type === 'pdf' ? '📄' : '📝'}
                              </span>
                              {material.title}
                              {material.duration && (
                                <span className="text-xs text-gray-500 ml-2">({material.duration})</span>
                              )}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Video Player */}
          <div className="lg:col-span-3">
            {currentMaterial ? (
              <div className="space-y-6">
                {/* Video/Content Player */}
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="relative pb-[56.25%] h-0 bg-black">
                    {currentMaterial.type === 'video' ? (
                      currentMaterial.url.includes('youtube.com') || currentMaterial.url.includes('youtu.be') ? (
                        <iframe
                          src={currentMaterial.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                          title={currentMaterial.title}
                          frameBorder="0"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                        />
                      ) : (
                        <video
                          src={currentMaterial.url}
                          controls
                          className="absolute top-0 left-0 w-full h-full"
                          controlsList="nodownload"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : currentMaterial.type === 'pdf' ? (
                      <iframe
                        src={currentMaterial.url}
                        title={currentMaterial.title}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">📝</div>
                          <h3 className="font-orbitron text-xl text-white mb-2">{currentMaterial.title}</h3>
                          <a
                            href={currentMaterial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 rounded-lg bg-cyber-blue text-white font-rajdhani font-semibold hover:bg-cyber-blue/80 transition-colors"
                          >
                            Download Material
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Material Info */}
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="font-orbitron text-2xl font-bold text-white mb-4">{currentMaterial.title}</h2>
                  {selectedModule?.description && (
                    <p className="font-inter text-gray-300 mb-4">{selectedModule.description}</p>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between glass-card p-6 rounded-xl">
                  <button
                    onClick={() => {
                      const currentIndex = sortedModules.findIndex(m => m.id === selectedModule?.id);
                      if (currentIndex > 0) {
                        const prevModule = sortedModules[currentIndex - 1];
                        setSelectedModule(prevModule);
                        if (prevModule.materials && prevModule.materials.length > 0) {
                          const sorted = prevModule.materials.sort((a, b) => a.order - b.order);
                          setSelectedMaterial(sorted[sorted.length - 1].id);
                        }
                      }
                    }}
                    disabled={sortedModules.findIndex(m => m.id === selectedModule?.id) === 0}
                    className="px-6 py-3 rounded-lg bg-gray-800 text-white font-rajdhani font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous Module
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = sortedModules.findIndex(m => m.id === selectedModule?.id);
                      if (currentIndex < sortedModules.length - 1) {
                        const nextModule = sortedModules[currentIndex + 1];
                        setSelectedModule(nextModule);
                        if (nextModule.materials && nextModule.materials.length > 0) {
                          const sorted = nextModule.materials.sort((a, b) => a.order - b.order);
                          setSelectedMaterial(sorted[0].id);
                        }
                      }
                    }}
                    disabled={sortedModules.findIndex(m => m.id === selectedModule?.id) === sortedModules.length - 1}
                    className="px-6 py-3 rounded-lg bg-cyber-blue text-white font-rajdhani font-semibold hover:bg-cyber-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Module →
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 rounded-xl text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="font-orbitron text-xl text-white mb-2">Select a module to start learning</h3>
                <p className="font-inter text-gray-400">Choose a module from the sidebar to begin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

