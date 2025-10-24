import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy - CyberProbes Digital Forensics",
  description: "CyberProbes privacy policy outlining how we collect, use, and protect your personal information in compliance with GDPR and data protection laws.",
  keywords: "privacy policy, data protection, GDPR compliance, digital forensics privacy, cybersecurity privacy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
            🔒 Your Privacy is Our Priority
          </h2>
          <p className="text-blue-700 dark:text-blue-300 mb-0">
            CyberProbes is committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we collect, use, and safeguard your data in compliance with GDPR and other applicable laws.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Name, email address, and contact information</li>
            <li>Company or organization details</li>
            <li>Professional credentials and certifications</li>
            <li>Case-related information and communications</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Digital Evidence</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>Files, documents, and digital artifacts submitted for analysis</li>
            <li>System logs, network traffic, and forensic images</li>
            <li>Metadata and technical information related to evidence</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technical Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>IP addresses, browser information, and device identifiers</li>
            <li>Website usage patterns and analytics data</li>
            <li>Security logs and access records</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🔍 Forensic Services</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm">
                <li>Conducting digital forensic investigations</li>
                <li>Analyzing evidence and preparing reports</li>
                <li>Providing expert testimony and consultation</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📞 Communication</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm">
                <li>Responding to inquiries and requests</li>
                <li>Providing case updates and notifications</li>
                <li>Emergency incident response coordination</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🛡️ Security</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm">
                <li>Protecting against unauthorized access</li>
                <li>Monitoring for security threats</li>
                <li>Maintaining audit trails and logs</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">⚖️ Legal Compliance</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm">
                <li>Meeting legal and regulatory requirements</li>
                <li>Supporting litigation and legal proceedings</li>
                <li>Maintaining chain of custody documentation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Protection & Security</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔐 Security Measures</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Encryption</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AES-256 encryption for data at rest and in transit</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 text-xl">🛡️</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Access Control</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Multi-factor authentication and role-based access</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 text-xl">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Monitoring</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">24/7 security monitoring and incident response</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Your Rights (GDPR)</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Right to Access</h3>
                <p className="text-gray-600 dark:text-gray-300">Request copies of your personal data we hold</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Right to Rectification</h3>
                <p className="text-gray-600 dark:text-gray-300">Request correction of inaccurate or incomplete data</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Right to Erasure</h3>
                <p className="text-gray-600 dark:text-gray-300">Request deletion of your data (subject to legal obligations)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Right to Portability</h3>
                <p className="text-gray-600 dark:text-gray-300">Receive your data in a structured, machine-readable format</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Retention</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Data Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Retention Period</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Contact Information</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3 years after last contact</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Business relationship</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Case Evidence</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">7 years or as legally required</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Legal compliance</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Security Logs</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1 year</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Security monitoring</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Website Analytics</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">26 months</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Service improvement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Information</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Data Protection Officer</h3>
            <div className="space-y-2 text-blue-700 dark:text-blue-300">
              <p><strong>Email:</strong> privacy@cyberprobes.com</p>
              <p><strong>Phone:</strong> +91 7007351691</p>
              <p><strong>Address:</strong> CyberProbes Digital Forensics, India</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                For privacy-related inquiries, please allow up to 30 days for a complete response as required by GDPR.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Updates to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. 
            We will notify you of any material changes by posting the updated policy on our website and updating the 
            "Last updated" date at the top of this page.
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Important:</strong> Continued use of our services after any changes to this policy constitutes 
              acceptance of the updated terms.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
