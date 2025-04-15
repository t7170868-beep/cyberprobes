import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive cyber security and digital forensic solutions to protect your business.
        </p>
      </div>

      {/* Service Categories */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="#pentesting" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-blue-600 service-card">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Penetration Testing</h3>
              <p className="font-medium">
                Identify and exploit vulnerabilities in your systems before attackers do.
              </p>
            </div>
          </Link>
          
          <Link href="#forensics" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-purple-600 service-card">
              <div className="text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Digital Forensics</h3>
              <p className="font-medium">
                Expert investigation and analysis of digital evidence for incidents or legal purposes.
              </p>
            </div>
          </Link>
          
          <Link href="#consulting" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-green-600 service-card">
              <div className="text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Security Consulting</h3>
              <p className="font-medium">
                Strategic guidance on security policies, compliance, and best practices.
              </p>
            </div>
          </Link>
          
          <Link href="#training" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-yellow-600 service-card">
              <div className="text-yellow-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Security Training</h3>
              <p className="font-medium">
                Educate your team on security awareness and best practices to prevent breaches.
              </p>
            </div>
          </Link>
          
          <Link href="#incident-response" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-red-600 service-card">
              <div className="text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Incident Response</h3>
              <p className="font-medium">
                Rapid and effective response to security incidents to minimize damage.
              </p>
            </div>
          </Link>
          
          <Link href="#compliance" className="block">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-indigo-600 service-card">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Compliance Services</h3>
              <p className="font-medium">
                Help meet regulatory requirements and industry standards for data security.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Detailed Service Descriptions */}
      <div className="space-y-24">
        {/* Penetration Testing */}
        <div id="pentesting" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-blue-100 text-blue-800 inline-block p-2 rounded-md mb-4">Penetration Testing</div>
              <h2 className="text-3xl font-bold mb-6">Identify Vulnerabilities Before Hackers Do</h2>
              <p className="text-gray-700 mb-4">
                Our comprehensive penetration testing services simulate real-world attacks on your systems to identify security 
                vulnerabilities before malicious actors can exploit them.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Web Application Penetration Testing</li>
                <li>Network Infrastructure Testing</li>
                <li>Mobile Application Security Testing</li>
                <li>Cloud Infrastructure Assessment</li>
                <li>IoT Device Security Testing</li>
                <li>Social Engineering Simulations</li>
              </ul>
              <p className="text-gray-700 mb-6">
                After each test, we provide detailed reports with clear remediation steps to help you address identified vulnerabilities.
              </p>
              <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
                Request Penetration Testing
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/pentesting.jpg"
                  alt="Penetration Testing"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Digital Forensics */}
        <div id="forensics" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-purple-100 text-purple-800 inline-block p-2 rounded-md mb-4">Digital Forensics</div>
              <h2 className="text-3xl font-bold mb-6">Expert Digital Evidence Collection and Analysis</h2>
              <p className="text-gray-700 mb-4">
                Our digital forensics team employs advanced techniques to investigate security incidents, collect and analyze 
                digital evidence, and help prepare for legal proceedings.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Incident Investigation and Analysis</li>
                <li>Evidence Collection and Preservation</li>
                <li>Data Recovery from Compromised Systems</li>
                <li>Mobile Device Forensics</li>
                <li>Memory and Malware Analysis</li>
                <li>Expert Witness Services</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Our forensic experts have experience working with law enforcement and legal teams to support investigations 
                and litigation.
              </p>
              <Link href="/contact" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg">
                Request Forensic Services
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/forensics.jpg"
                  alt="Digital Forensics"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Consulting */}
        <div id="consulting" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-green-100 text-green-800 inline-block p-2 rounded-md mb-4">Security Consulting</div>
              <h2 className="text-3xl font-bold mb-6">Strategic Security Guidance for Your Business</h2>
              <p className="text-gray-700 mb-4">
                Our security consulting services provide expert guidance on developing and implementing effective security 
                strategies and policies for your organization.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Security Program Development</li>
                <li>Risk Assessment and Management</li>
                <li>Security Architecture Design</li>
                <li>Policy and Procedure Development</li>
                <li>Vendor Security Assessment</li>
                <li>Security Technology Selection</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We work closely with your team to understand your business needs and develop tailored security solutions.
              </p>
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg">
                Request Consulting Services
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/consulting.jpg"
                  alt="Security Consulting"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Training */}
        <div id="training" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-yellow-100 text-yellow-800 inline-block p-2 rounded-md mb-4">Security Training</div>
              <h2 className="text-3xl font-bold mb-6">Empower Your Team with Security Knowledge</h2>
              <p className="text-gray-700 mb-4">
                Our security training programs help build a security-conscious culture in your organization by educating 
                employees on security best practices and threat awareness.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Security Awareness Training</li>
                <li>Phishing Simulation Exercises</li>
                <li>Secure Coding Practices</li>
                <li>Executive Security Training</li>
                <li>Incident Response Tabletop Exercises</li>
                <li>Customized Training Programs</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We offer both in-person and online training options to accommodate different learning preferences and schedules.
              </p>
              <Link href="/contact" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg">
                Request Training Services
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/training.jpg"
                  alt="Security Training"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-24 p-12 rounded-lg">
        <div className="text-center">
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
      </div>
    </div>
  );
} 