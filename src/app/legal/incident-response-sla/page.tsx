import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Incident Response SLA - CyberProbes Digital Forensics",
  description: "CyberProbes incident response service level agreements with guaranteed response times and 24/7 emergency support for critical security incidents.",
  keywords: "incident response SLA, emergency response, cybersecurity SLA, response times, 24/7 support",
};

export default function IncidentResponseSLAPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Incident Response SLA</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Guaranteed response times and service commitments for critical security incidents
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            🚨 Emergency Response Guarantee
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-0">
            <strong>15-minute response time</strong> for critical incidents with 24/7/365 availability. 
            Our incident response team is always ready to help secure your organization.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Level Commitments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">15 min</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Critical Response</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Systems down, active attack, data breach in progress
              </p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">1 hour</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Priority</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Suspicious activity, potential compromise, security alerts
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">4 hours</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Standard</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Forensic analysis requests, consultation, routine investigations
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Incident Classification</h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-red-600 text-white px-6 py-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="mr-2">🔴</span> Critical (P1) - 15 Minutes
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Incident Types:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Active ransomware attack</li>
                      <li>Data breach in progress</li>
                      <li>Complete system compromise</li>
                      <li>Critical infrastructure failure</li>
                      <li>Ongoing data exfiltration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response Actions:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Immediate phone contact</li>
                      <li>Senior analyst assignment</li>
                      <li>Emergency containment guidance</li>
                      <li>On-site deployment (if needed)</li>
                      <li>Continuous monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-orange-600 text-white px-6 py-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="mr-2">🟠</span> High (P2) - 1 Hour
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Incident Types:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Malware detection</li>
                      <li>Suspicious network activity</li>
                      <li>Security tool alerts</li>
                      <li>Potential insider threat</li>
                      <li>Phishing campaign targeting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response Actions:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Phone/email acknowledgment</li>
                      <li>Initial assessment</li>
                      <li>Containment recommendations</li>
                      <li>Evidence preservation guidance</li>
                      <li>Investigation planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-yellow-600 text-white px-6 py-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="mr-2">🟡</span> Standard (P3) - 4 Hours
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Incident Types:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forensic analysis requests</li>
                      <li>Historical investigation</li>
                      <li>Compliance requirements</li>
                      <li>Training and consultation</li>
                      <li>Routine security assessment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response Actions:</h4>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Email acknowledgment</li>
                      <li>Case assignment</li>
                      <li>Timeline establishment</li>
                      <li>Resource allocation</li>
                      <li>Regular status updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">24/7 Emergency Contact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">🚨 Emergency Hotline</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">+91 7007351691</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Available 24/7/365</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">emergency@cyberprobes.com</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Monitored continuously</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">WhatsApp Emergency</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Instant messaging support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">📋 When You Call</h3>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <p><strong>Have Ready:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Your contact information</li>
                  <li>Brief incident description</li>
                  <li>Affected systems/users</li>
                  <li>Timeline of events</li>
                  <li>Current status</li>
                </ul>
                <p className="mt-3"><strong>What Happens Next:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Immediate acknowledgment</li>
                  <li>Incident classification</li>
                  <li>Expert assignment</li>
                  <li>Action plan development</li>
                  <li>Continuous support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Guarantees</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Service Metric</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Target</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Measurement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Critical Incident Response</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="font-semibold text-red-600">≤ 15 minutes</span></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Time from alert to first contact</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">On-site Deployment</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="font-semibold text-orange-600">≤ 4 hours</span></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">For critical incidents requiring physical presence</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial Assessment</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="font-semibold text-blue-600">≤ 2 hours</span></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Preliminary findings and recommendations</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Status Updates</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="font-semibold text-green-600">Every 4 hours</span></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">During active incident response</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Preliminary Report</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="font-semibold text-purple-600">≤ 24 hours</span></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial findings and containment status</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Escalation Procedures</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">L1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">First Response</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Junior Analyst</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">L2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Senior Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Senior Analyst</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">L3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Expert Level</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lead Forensic Expert</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">L4</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Executive</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Director/CTO</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Automatic Escalation:</strong> If SLA targets are not met, incidents automatically escalate to the next level.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.8%</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">SLA Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Response time targets met</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">12 min</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Avg Response</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Critical incident response</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Availability</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Emergency support coverage</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">98%</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Success Rate</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Incident containment</p>
            </div>
          </div>
        </section>

        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            ✅ SLA Commitment
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-4">
            We stand behind our service level agreements. If we fail to meet our response time commitments, 
            you are eligible for service credits as outlined in your service agreement.
          </p>
          <div className="text-green-700 dark:text-green-300">
            <p><strong>Contact for SLA inquiries:</strong> sla@cyberprobes.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
