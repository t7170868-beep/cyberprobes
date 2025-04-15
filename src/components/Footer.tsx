'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CyberProbes</h3>
            <p className="text-gray-400 dark:text-gray-300">
              Professional cyber security and digital forensics services for businesses and individuals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 dark:text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 dark:text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 dark:text-gray-300 hover:text-white">Services</Link></li>
              <li><Link href="/blog" className="text-gray-400 dark:text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#pentesting" className="text-gray-400 dark:text-gray-300 hover:text-white">Penetration Testing</Link></li>
              <li><Link href="/services#forensics" className="text-gray-400 dark:text-gray-300 hover:text-white">Digital Forensics</Link></li>
              <li><Link href="/services#consulting" className="text-gray-400 dark:text-gray-300 hover:text-white">Security Consulting</Link></li>
              <li><Link href="/services#training" className="text-gray-400 dark:text-gray-300 hover:text-white">Security Training</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
              <li>Email: info@cyberprobes.in</li>
              <li>Phone: 7007351691</li>
              <li>Address: Rajajipuram, Lucknow, Uttar Pradesh</li>
            </ul>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
              <div className="flex space-x-3">
                <a href="https://www.linkedin.com/company/cyberprobes/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" title="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} CyberProbes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 