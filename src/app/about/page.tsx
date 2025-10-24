import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About CyberProbes - Digital Forensics & Cybersecurity Experts",
  description: "Learn about CyberProbes, a team of dedicated cybersecurity professionals committed to protecting your digital assets with integrity, innovation, and client partnership.",
  keywords: "about cyberprobes, cybersecurity team, digital forensics experts, security professionals, cyber investigation",
  openGraph: {
    title: "About CyberProbes - Digital Forensics & Cybersecurity Experts",
    description: "Learn about CyberProbes, a team of dedicated cybersecurity professionals committed to protecting your digital assets with integrity, innovation, and client partnership.",
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About CyberProbes - Digital Forensics & Cybersecurity Experts",
    description: "Learn about CyberProbes, a team of dedicated cybersecurity professionals committed to protecting your digital assets with integrity, innovation, and client partnership.",
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-bg-secondary relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold cyber-text mb-6">About CyberProbes</h1>
            <p className="font-rajdhani text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              We are a team of dedicated cybersecurity professionals committed to protecting your digital assets and securing your future.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-bg-tertiary relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="glass-card rounded-2xl overflow-hidden p-8">
                <div className="relative h-96 w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-neon-purple opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-orbitron text-5xl font-bold text-white cyber-glow">CyberProbes</span>
                  </div>
                  <div className="absolute inset-0 cyber-grid opacity-30"></div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold cyber-text mb-6">Our Story</h2>
              <p className="font-inter text-gray-300 mb-6 leading-relaxed">
                CyberProbes was founded to tackle the growing challenges of digital security and forensics in an increasingly interconnected world. Our founder, Mr.Adash Srivastava, driven by a passion for technology and a commitment to protecting digital information, saw the urgent need for a trusted partner in unraveling digital complexities.
              </p>
              <p className="font-inter text-gray-300 mb-6 leading-relaxed">
                From day one, CyberProbes has stood on the pillars of integrity, trust, and innovation. Backed by a team of skilled professionals, we aim to bridge the gap between inexperience and expertise in the cybersecurity space.
              </p>
              <p className="font-inter text-gray-300 mb-6 leading-relaxed">
                Our mission is simple yet vital: to safeguard data, uncover hidden truths, and create a safer digital landscape. As threats evolve, so do we—continuously learning, innovating, and upholding the highest ethical standards.
              </p>
              <p className="font-inter text-gray-300 mb-6 leading-relaxed">
                Join us as we lead the way in digital forensics, empowering individuals and organizations with clarity, confidence, and truth in the digital age.
              </p>
              <Link 
                href="/contact" 
                className="magnetic-button glass-button px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-white hover:text-black transition-colors inline-flex items-center"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold cyber-text mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl magnetic-button group">
              <div className="w-16 h-16 glow-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-pink/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">Integrity</h3>
              <p className="font-inter text-gray-300">
                We operate with complete transparency and ethical standards. Your trust is our most valuable asset.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl magnetic-button group">
              <div className="w-16 h-16 glow-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyber-blue/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="font-inter text-gray-300">
                Cybersecurity threats evolve daily. We stay ahead with continuous research and cutting-edge approaches.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl magnetic-button group">
              <div className="w-16 h-16 glow-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-green/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">Client Partnership</h3>
              <p className="font-inter text-gray-300">
                Your security is our priority. We work closely with you to build solutions that fit your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bg-tertiary relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card p-12 rounded-2xl text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold cyber-text mb-6">Ready to secure your digital future?</h2>
            <p className="font-rajdhani text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our team of experts is ready to help you build a comprehensive security strategy tailored to your organization's unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/services" 
                className="magnetic-button glass-button px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-white hover:text-black transition-colors"
              >
                <span className="relative z-10">Our Services</span>
              </Link>
              <Link 
                href="/contact" 
                className="magnetic-button glow-border px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg text-cyber-blue hover:text-white transition-colors"
              >
                <span className="relative z-10">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 