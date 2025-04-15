import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '@/components/PlaceholderImage';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Your Digital Presence</h1>
              <p className="text-xl mb-8">
                Professional cyber security and digital forensic services to protect your business and data.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/services" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Our Services
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full">
                <PlaceholderImage 
                  alt="Cyber Security" 
                  className="rounded-lg shadow-xl" 
                  height="100%"
                  width="100%"
                  style={{ position: 'absolute' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Cyber Security Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide comprehensive cyber security solutions to protect your business from emerging threats.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 service-card p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Penetration Testing</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Identify vulnerabilities in your systems before attackers do with our comprehensive penetration testing services.
              </p>
              <Link href="/services#pentesting" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center">
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 service-card p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Forensics</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Investigate incidents, collect evidence, and analyze digital artifacts with our expert forensic services.
              </p>
              <Link href="/services#forensics" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center">
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 service-card p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Security Consulting</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get expert advice on security strategy, compliance, and best practices tailored to your business needs.
              </p>
              <Link href="/services#consulting" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium inline-flex items-center">
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and learn how we can help protect your digital assets.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
