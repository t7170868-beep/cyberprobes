import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy - CyberProbes",
  description: "CyberProbes privacy policy outlining how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, cybersecurity privacy, contact form privacy",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "https://main.d1ce8jq8iz0ibb.amplifyapp.com"
  ),
  alternates: {
    canonical: '/legal/privacy-policy',
  },
  openGraph: {
    title: "Privacy Policy - CyberProbes",
    description: "CyberProbes privacy policy outlining how we collect, use, and protect your personal information.",
    url: '/legal/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CYBERPROBES — Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Last Updated: November 2025
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <p className="text-blue-700 dark:text-blue-300 mb-0">
            At CyberProbes, we are committed to protecting your privacy and handling your personal information with transparency and responsibility. 
            This Privacy Policy explains what data we collect, how we use it, and the choices you have regarding your information.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We collect only the information you voluntarily provide through our website contact form:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Name</strong></li>
            <li><strong>Email Address</strong></li>
            <li><strong>Phone Number</strong></li>
            <li><strong>Message or Inquiry Details</strong></li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-0">
              <strong>Note:</strong> We do not collect any financial information, passwords, sensitive personal data, or tracking-based personal identity data.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use the information you submit for the following purposes:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>To respond to your queries or service requests</li>
            <li>To provide information about our cybersecurity services</li>
            <li>To communicate regarding project details or follow-up support</li>
            <li>To improve our website's user experience</li>
          </ul>

          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <p className="text-green-800 dark:text-green-200 text-sm mb-0">
              <strong>We do not sell, rent, or trade your personal information with third parties.</strong>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cookies & Analytics</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our website may use basic cookies or analytics tools (such as Google Analytics) to:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Measure website performance</li>
            <li>Understand user interaction</li>
            <li>Improve site functionality</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These tools collect non-personal, aggregated data, such as browser type, device information, and anonymous usage patterns.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-0">
              <strong>No personally identifiable information is collected through cookies.</strong>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Sharing</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may share your information only in the following limited cases:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>With trusted service providers who help us operate our website</li>
            <li>If required by law, court order, or government authority</li>
            <li>To prevent fraud, cyber threats, or security risks</li>
          </ul>

          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
            <p className="text-red-800 dark:text-red-200 text-sm mb-0">
              <strong>We do not share your information with advertisers, marketing platforms, or unrelated third parties.</strong>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We implement standard security measures to protect your data from:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Unauthorized access</li>
            <li>Alteration</li>
            <li>Disclosure</li>
            <li>Misuse</li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-0">
              While we follow industry best practices, no method of data transmission over the internet is 100% secure.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Depending on your region, you may have the right to:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Request access to your personal data</li>
            <li>Ask for corrections or updates</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent to communication</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300">
            You can exercise these rights anytime by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Third-Party Links</h2>
          
          <p className="text-gray-700 dark:text-gray-300">
            Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
          
          <p className="text-gray-700 dark:text-gray-300">
            CyberProbes does not knowingly collect data from individuals under 18 years of age. If you believe such data has been provided, please contact us for removal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to This Policy</h2>
          
          <p className="text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              For any questions or privacy-related concerns, you can reach us at:
            </p>
            <div className="space-y-2 text-blue-700 dark:text-blue-300">
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <strong>Email:</strong> <a href="mailto:support@cyberprobes.in" className="ml-2 underline hover:text-blue-900 dark:hover:text-blue-100">support@cyberprobes.in</a>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🌐</span>
                <strong>Website:</strong> <a href="https://www.cyberprobes.in" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-blue-900 dark:hover:text-blue-100">www.cyberprobes.in</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
