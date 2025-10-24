import Link from 'next/link';
import Image from 'next/image';
import CyberForensicProcess from '@/components/CyberForensicProcess';
import CyberHero from '@/components/CyberHero';

export default function Home() {
  return (
    <>
      {/* Futuristic Cyber Hero Section */}
      <CyberHero />

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden scroll-reveal">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold cyber-text mb-6">
              Our Cyber Security Services
            </h2>
            <p className="font-rajdhani text-xl text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive cyber security solutions to protect your business from emerging threats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card p-6 md:p-8 rounded-xl magnetic-button group">
              <div className="w-16 h-16 glow-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyber-blue/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Penetration Testing</h3>
              <p className="font-inter text-gray-300 mb-6">
                Identify vulnerabilities in your systems before attackers do with our comprehensive penetration testing services.
              </p>
              <Link href="/services#pentesting" className="font-rajdhani font-semibold text-cyber-blue hover:text-neon-green transition-colors inline-flex items-center">
                Learn More <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 service-card p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-2 md:p-3 rounded-full inline-block mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Digital Forensics</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm sm:text-base">
                Investigate incidents, collect evidence, and analyze digital artifacts with our expert forensic services.
              </p>
              <Link href="/services#forensics" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center text-sm sm:text-base">
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 service-card p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-2 md:p-3 rounded-full inline-block mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Security Consulting</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm sm:text-base">
                Get expert advice on security strategy, compliance, and best practices tailored to your business needs.
              </p>
              <Link href="/services#consulting" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium inline-flex items-center text-sm sm:text-base">
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals & Stats */}
      <section className="py-16 md:py-24 bg-bg-tertiary relative overflow-hidden scroll-reveal">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold cyber-text mb-6">Why Choose CyberProbes?</h2>
            <p className="font-rajdhani text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by organizations worldwide for expert cybersecurity and digital forensics services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="glass-card p-6 rounded-xl text-center magnetic-button">
              <div className="font-orbitron text-4xl md:text-5xl font-bold cyber-text mb-3">150+</div>
              <div className="font-rajdhani text-lg text-gray-300">Incidents Resolved</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button">
              <div className="font-orbitron text-4xl md:text-5xl font-bold text-neon-purple mb-3">24/7</div>
              <div className="font-rajdhani text-lg text-gray-300">Emergency Response</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button">
              <div className="font-orbitron text-4xl md:text-5xl font-bold text-neon-green mb-3">98%</div>
              <div className="font-rajdhani text-lg text-gray-300">Evidence Recovery Rate</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button">
              <div className="font-orbitron text-4xl md:text-5xl font-bold text-neon-pink mb-3">5+</div>
              <div className="font-rajdhani text-lg text-gray-300">Years Experience</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="text-center">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">Certified Professionals</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="glass-card px-4 py-2 rounded-full font-rajdhani text-cyber-blue border border-cyber-blue/30">CEH Certified</span>
              <span className="glass-card px-4 py-2 rounded-full font-rajdhani text-neon-green border border-neon-green/30">GCFA Certified</span>
              <span className="glass-card px-4 py-2 rounded-full font-rajdhani text-neon-purple border border-neon-purple/30">ISO 27001</span>
              <span className="glass-card px-4 py-2 rounded-full font-rajdhani text-neon-pink border border-neon-pink/30">CISSP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden scroll-reveal">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold cyber-text mb-6">Our Forensic Process</h2>
            <p className="font-rajdhani text-xl text-gray-300 max-w-3xl mx-auto">
              We follow industry-standard methodology to ensure accurate and legally admissible results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card p-6 rounded-xl text-center magnetic-button group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative" style={{backgroundColor: '#00E5FF', boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)'}}>
                <span className="font-orbitron text-2xl font-bold text-black">1</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{animationDuration: '3s'}}></div>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Identification</h3>
              <p className="font-inter text-gray-300">Locate and identify potential sources of digital evidence</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative" style={{backgroundColor: '#A94DFF', boxShadow: '0 0 20px rgba(169, 77, 255, 0.4)'}}>
                <span className="font-orbitron text-2xl font-bold text-black">2</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Preservation</h3>
              <p className="font-inter text-gray-300">Secure and preserve evidence using forensically sound methods</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative" style={{backgroundColor: '#00FFB3', boxShadow: '0 0 20px rgba(0, 255, 179, 0.4)'}}>
                <span className="font-orbitron text-2xl font-bold text-black">3</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Analysis</h3>
              <p className="font-inter text-gray-300">Examine and analyze evidence using advanced forensic tools</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center magnetic-button group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative" style={{backgroundColor: '#FF4D4D', boxShadow: '0 0 20px rgba(255, 77, 77, 0.4)'}}>
                <span className="font-orbitron text-2xl font-bold text-black">4</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}}></div>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Reporting</h3>
              <p className="font-inter text-gray-300">Deliver comprehensive reports with findings and recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Forensic Process */}
      <CyberForensicProcess />

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Ready to Secure Your Business?</h2>
          <p className="text-base sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and learn how we can help protect your digital assets.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-900 hover:bg-blue-100 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

