import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">About CyberProbes</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We are a team of dedicated cybersecurity professionals committed to protecting your digital assets and securing your future.
        </p>
      </div>

      {/* Our Story */}
      <div className="flex flex-col md:flex-row items-center mb-20">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">CyberProbes</div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Founded in 2018, CyberProbes began with a simple mission: to make cybersecurity accessible and effective for businesses of all sizes. 
            Our founders, with over 30 years of combined experience in information security, recognized that many organizations struggle to protect 
            themselves in an increasingly complex digital landscape.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've since grown into a comprehensive security partner for hundreds of clients across multiple industries, bringing enterprise-grade 
            security practices to organizations that previously couldn't access such expertise.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-3 inline-flex rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Integrity</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We operate with complete transparency and ethical standards. Your trust is our most valuable asset.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 inline-flex rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cybersecurity threats evolve daily. We stay ahead with continuous research and cutting-edge approaches.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-3 inline-flex rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Client Partnership</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your security is our priority. We work closely with you to build solutions that fit your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Meet Our Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14.75c3.17 0 5.75-2.58 5.75-5.75S15.17 3.25 12 3.25 6.25 5.83 6.25 9s2.58 5.75 5.75 5.75zm0-10c2.34 0 4.25 1.91 4.25 4.25s-1.91 4.25-4.25 4.25S7.75 11.34 7.75 9 9.66 4.75 12 4.75zm6 11.5c0-.53-.11-1.04-.3-1.5H6.3c-.19.46-.3.97-.3 1.5V17h12v-.75z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Sarah Johnson</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Former CISO with 15+ years of experience in financial services cybersecurity. Leading CyberProbes' vision of accessible security.
              </p>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14.75c3.17 0 5.75-2.58 5.75-5.75S15.17 3.25 12 3.25 6.25 5.83 6.25 9s2.58 5.75 5.75 5.75zm0-10c2.34 0 4.25 1.91 4.25 4.25s-1.91 4.25-4.25 4.25S7.75 11.34 7.75 9 9.66 4.75 12 4.75zm6 11.5c0-.53-.11-1.04-.3-1.5H6.3c-.19.46-.3.97-.3 1.5V17h12v-.75z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Michael Chen</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Expert in cryptography and secure systems design with background in leading security research at major tech companies.
              </p>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14.75c3.17 0 5.75-2.58 5.75-5.75S15.17 3.25 12 3.25 6.25 5.83 6.25 9s2.58 5.75 5.75 5.75zm0-10c2.34 0 4.25 1.91 4.25 4.25s-1.91 4.25-4.25 4.25S7.75 11.34 7.75 9 9.66 4.75 12 4.75zm6 11.5c0-.53-.11-1.04-.3-1.5H6.3c-.19.46-.3.97-.3 1.5V17h12v-.75z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Emily Rodriguez</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">Director of Forensics</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Former law enforcement digital forensics specialist with experience in investigating cybercrime and recovering digital evidence.
              </p>
            </div>
          </div>
          
          {/* Team Member 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14.75c3.17 0 5.75-2.58 5.75-5.75S15.17 3.25 12 3.25 6.25 5.83 6.25 9s2.58 5.75 5.75 5.75zm0-10c2.34 0 4.25 1.91 4.25 4.25s-1.91 4.25-4.25 4.25S7.75 11.34 7.75 9 9.66 4.75 12 4.75zm6 11.5c0-.53-.11-1.04-.3-1.5H6.3c-.19.46-.3.97-.3 1.5V17h12v-.75z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">David Okafor</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">Lead Security Consultant</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Certified ethical hacker specialized in red teaming and adversarial simulation for organizations of all sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to secure your digital future?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Our team of experts is ready to help you build a comprehensive security strategy tailored to your organization's unique needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/services" 
            className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Our Services
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 