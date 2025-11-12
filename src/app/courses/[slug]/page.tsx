'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  category: string;
  level: string;
  duration?: string;
  price: number;
  instructor?: string;
  instructorBio?: string;
  instructorPhoto?: string;
  whatYoullLearn?: string;
  prerequisites?: string;
  skillsCovered?: string;
  certification?: string;
  published: boolean;
  modules?: Array<{
    id: string;
    title: string;
    description?: string;
    order: number;
    duration?: string;
    materials: Array<{
      id: string;
      title: string;
      type: string;
      duration?: string;
      order?: number;
    }>;
  }>;
  enrollments?: Array<{
    userId: string;
  }>;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { slug } = params;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [slug, session]);

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/courses?published=true`);
      
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const courses = await response.json();
      const foundCourse = courses.find((c: Course) => c.slug === slug);
      
      if (!foundCourse) {
        router.push('/courses');
        return;
      }

      // Fetch full course details
      const courseRes = await fetch(`/api/courses/${foundCourse.id}`);
      if (courseRes.ok) {
        const fullCourse = await courseRes.json();
        setCourse(fullCourse);
        
        // Check if user is enrolled
        if (session?.user?.email) {
          const enrollmentRes = await fetch(`/api/enrollments/check?courseId=${fullCourse.id}`);
          if (enrollmentRes.ok) {
            const enrollment = await enrollmentRes.json();
            setIsEnrolled(enrollment.enrolled);
          }
        }
      } else {
        setCourse(foundCourse);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!session) {
      // Redirect to login with callback to current course
      router.push(`/auth/login?callbackUrl=${encodeURIComponent('/courses/' + slug)}`);
      return;
    }

    setIsEnrolling(true);
    setError('');
    
    try {
      if (course?.price === 0) {
        // Free course - direct enrollment
        const res = await fetch('/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId: course.id }),
        });

        if (res.ok) {
          setIsEnrolled(true);
          // Show success message
          alert('✅ Successfully enrolled! Redirecting to course...');
          router.push(`/dashboard/courses/${course.slug}`);
        } else {
          const data = await res.json();
          setError(data.error || 'Failed to enroll');
        }
      } else {
        // Paid course - initiate Razorpay payment
        await initializeRazorpayPayment();
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setError('Failed to enroll. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const initializeRazorpayPayment = async () => {
    if (!course) return;

    try {
      // Create order on backend
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
        }),
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create payment order');
      }

      const { orderId, amount, currency } = await orderRes.json();

      // Load Razorpay script if not already loaded
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy', // Replace with actual key
          amount: amount,
          currency: currency,
          name: 'CyberProbes',
          description: course.title,
          order_id: orderId,
          handler: async function (response: any) {
            // Verify payment on backend
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                courseId: course.id,
              }),
            });

            if (verifyRes.ok) {
              setIsEnrolled(true);
              alert('🎉 Payment successful! Welcome to the course!');
              router.push(`/dashboard/courses/${course.slug}`);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
          },
          theme: {
            color: '#00f0ff',
          },
          modal: {
            ondismiss: function () {
              setIsEnrolling(false);
              setError('Payment cancelled');
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError('Failed to initialize payment. Please try again.');
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-rajdhani text-gray-300">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 rounded-xl text-red-400 mb-8">{error}</div>
          <Link href="/courses" className="text-cyber-blue hover:text-neon-green">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!course) return null;

  const learnPoints = course.whatYoullLearn ? JSON.parse(course.whatYoullLearn) : [];
  const prerequisites = course.prerequisites ? JSON.parse(course.prerequisites) : [];
  const skills = course.skillsCovered ? JSON.parse(course.skillsCovered) : [];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyber-blue/30 to-neon-purple/30"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <Link href="/courses" className="text-cyber-blue hover:text-neon-green mb-4 inline-flex items-center font-rajdhani">
              ← Back to Courses
            </Link>
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">{course.title}</h1>
            <p className="font-rajdhani text-xl text-gray-200 max-w-3xl">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <div className="glass-card p-8 rounded-xl">
              <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Course Overview</h2>
              
              {learnPoints.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learnPoints.map((point: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-neon-green mt-1">✓</span>
                        <span className="font-inter text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4">Skills covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 rounded-full bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 font-rajdhani text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Format */}
              <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-cyber-blue/10 to-neon-purple/10 border border-cyber-blue/30">
                <h3 className="font-rajdhani text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Course Format
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <div className="text-2xl mb-1">🎥</div>
                    <div className="text-sm font-rajdhani text-gray-300">HD Video Lectures</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <div className="text-2xl mb-1">📝</div>
                    <div className="text-sm font-rajdhani text-gray-300">Hands-on Labs</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-sm font-rajdhani text-gray-300">Quizzes & Assessments</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-sm font-rajdhani text-gray-300">Downloadable Resources</div>
                  </div>
                </div>
              </div>

              {prerequisites.length > 0 && (
                <div className="mb-8 p-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                  <h3 className="font-rajdhani text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Requirements
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {prerequisites.map((req: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">⚠</span>
                        <span className="font-inter text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.certification && (
                <div className="mb-8 p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
                  <h3 className="font-rajdhani text-lg font-semibold text-neon-green mb-2">Certification</h3>
                  <p className="font-inter text-gray-300">{course.certification}</p>
                </div>
              )}
            </div>

            {/* Course Modules */}
            {course.modules && course.modules.length > 0 && (
              <div className="glass-card p-8 rounded-xl">
                <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Course Modules</h2>
                <div className="space-y-4">
                  {course.modules
                    .sort((a, b) => a.order - b.order)
                    .map((module, idx) => (
                      <div key={module.id} className="border border-gray-700 rounded-lg p-6 hover:border-cyber-blue/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                              <span className="font-orbitron text-xl font-bold text-cyber-blue">{idx + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-rajdhani text-xl font-semibold text-white">{module.title}</h3>
                              {module.description && (
                                <p className="font-inter text-gray-400 text-sm mt-1">{module.description}</p>
                              )}
                            </div>
                          </div>
                          {module.duration && (
                            <span className="font-rajdhani text-sm text-gray-400">{module.duration}</span>
                          )}
                        </div>
                        {module.materials && module.materials.length > 0 && (
                          <div className="ml-16 space-y-2">
                            {module.materials
                              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                              .map((material) => (
                                <div key={material.id} className="flex items-center gap-3 text-sm text-gray-400">
                                  <span>
                                    {material.type === 'video' ? '▶' : material.type === 'pdf' ? '📄' : '📝'}
                                  </span>
                                  <span>{material.title}</span>
                                  {material.duration && <span className="text-gray-500">({material.duration})</span>}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Instructor Info */}
            {course.instructor && (
              <div className="glass-card p-8 rounded-xl">
                <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Instructor</h2>
                <div className="flex items-start gap-6">
                  {course.instructorPhoto && (
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={course.instructorPhoto}
                        alt={course.instructor}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-rajdhani text-xl font-semibold text-white mb-2">{course.instructor}</h3>
                    {course.instructorBio && (
                      <p className="font-inter text-gray-300">{course.instructorBio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl sticky top-24">
              <div className="text-center mb-6">
                <div className="font-orbitron text-4xl font-bold cyber-text mb-2">
                  {course.price === 0 ? 'Free' : `₹${course.price}`}
                </div>
                {course.duration && (
                  <p className="font-rajdhani text-gray-300">{course.duration}</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-rajdhani text-gray-400">Level</span>
                  <span className="font-rajdhani text-white">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-rajdhani text-gray-400">Category</span>
                  <span className="font-rajdhani text-white">{course.category}</span>
                </div>
                {course.modules && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-rajdhani text-gray-400">Modules</span>
                    <span className="font-rajdhani text-white">{course.modules.length}</span>
                  </div>
                )}
              </div>

              {isEnrolled ? (
                <Link
                  href={`/dashboard/courses/${course.slug}`}
                  className="block w-full text-center px-6 py-3 rounded-lg bg-neon-green text-black font-rajdhani font-semibold text-lg hover:bg-neon-green/80 transition-all hover:scale-105 hover:shadow-lg hover:shadow-neon-green/50"
                >
                  Go to Course →
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-neon-purple text-white font-rajdhani font-bold text-lg hover:scale-105 transition-all hover:shadow-xl hover:shadow-cyber-blue/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 magnetic-button"
                  >
                    {isEnrolling ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        {course.price === 0 ? '🎓 Enroll for Free' : `🔒 Secure Checkout - ${session ? 'Enroll Now' : 'Login to Enroll'}`}
                      </>
                    )}
                  </button>
                  
                  {/* Trust Badges */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-3">
                      <svg className="w-4 h-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-rajdhani">Secure Payment</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <span className="text-xs font-rajdhani text-gray-500">💳 Razorpay Secure</span>
                      <span className="text-xs font-rajdhani text-gray-500">✅ SSL Encrypted</span>
                      <span className="text-xs font-rajdhani text-gray-500">🔄 30-Day Refund</span>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

