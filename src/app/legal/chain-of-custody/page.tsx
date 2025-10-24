import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chain of Custody Protocol - CyberProbes Digital Forensics",
  description: "Learn about CyberProbes' chain of custody procedures ensuring evidence integrity and legal admissibility in digital forensic investigations.",
  keywords: "chain of custody, digital evidence, forensic procedures, evidence integrity, legal admissibility",
};

export default function ChainOfCustodyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chain of Custody Protocol</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Ensuring evidence integrity and legal admissibility through rigorous documentation and handling procedures
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
            ⚖️ Legal Compliance Guarantee
          </h2>
          <p className="text-green-700 dark:text-green-300 mb-0">
            Our chain of custody procedures meet international standards including ISO/IEC 27037, NIST SP 800-86, 
            and RFC 3227, ensuring 100% legal admissibility of digital evidence.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is Chain of Custody?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Chain of custody is a chronological documentation that records the sequence of custody, control, transfer, 
            analysis, and disposition of physical or electronic evidence. It provides a complete audit trail from 
            evidence collection to final disposition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Purpose</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>Maintain evidence integrity</li>
                <li>Ensure legal admissibility</li>
                <li>Prevent tampering or contamination</li>
                <li>Establish accountability</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📋 Documentation</h3>
              <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>Who handled the evidence</li>
                <li>When it was handled</li>
                <li>What actions were taken</li>
                <li>Where it was stored</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our 4-Phase Protocol</h2>
          
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Collection & Identification</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Required Documentation:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Date and time of collection</li>
                    <li>Location of evidence</li>
                    <li>Description of evidence</li>
                    <li>Collector identification</li>
                    <li>Witness information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tools Used:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Write-blocking hardware</li>
                    <li>Forensic imaging tools</li>
                    <li>Hash calculation utilities</li>
                    <li>Photography equipment</li>
                    <li>Evidence bags and labels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Transportation & Storage</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Security Measures:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Tamper-evident seals</li>
                    <li>Secure transport containers</li>
                    <li>Climate-controlled storage</li>
                    <li>Access-controlled facilities</li>
                    <li>24/7 surveillance monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Transfer Records:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Transfer date and time</li>
                    <li>Transferring person details</li>
                    <li>Receiving person details</li>
                    <li>Purpose of transfer</li>
                    <li>Condition verification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analysis & Examination</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analysis Protocol:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Work only on forensic copies</li>
                    <li>Maintain original evidence integrity</li>
                    <li>Document all analysis steps</li>
                    <li>Record tool versions and settings</li>
                    <li>Preserve intermediate results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Assurance:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Peer review of findings</li>
                    <li>Independent verification</li>
                    <li>Methodology validation</li>
                    <li>Results reproducibility</li>
                    <li>Error checking procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Reporting & Disposition</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Report Contents:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Complete chain of custody log</li>
                    <li>Analysis methodology</li>
                    <li>Findings and conclusions</li>
                    <li>Supporting documentation</li>
                    <li>Expert qualifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Final Disposition:</h4>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>Return to client/court</li>
                    <li>Secure destruction (if authorized)</li>
                    <li>Long-term archival storage</li>
                    <li>Final disposition documentation</li>
                    <li>Certificate of destruction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Digital Evidence Integrity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hash Verification</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                MD5, SHA-1, and SHA-256 hashes calculated and verified at each stage
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Write Protection</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Hardware and software write-blocking to prevent accidental modification
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Audit Trail</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete documentation of all actions and access to evidence
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal Standards Compliance</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Standard</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Compliance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">ISO/IEC 27037</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Guidelines for identification, collection, acquisition and preservation of digital evidence</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="text-green-600 font-semibold">✓ Full</span></td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">NIST SP 800-86</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Guide to Integrating Forensic Techniques into Incident Response</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="text-green-600 font-semibold">✓ Full</span></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">RFC 3227</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Guidelines for Evidence Collection and Archiving</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="text-green-600 font-semibold">✓ Full</span></td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">ACPO Guidelines</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Association of Chief Police Officers Good Practice Guide</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"><span className="text-green-600 font-semibold">✓ Full</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quality Assurance</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Internal Controls</h3>
                <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Dual-person integrity checks</li>
                  <li>Regular procedure audits</li>
                  <li>Staff training and certification</li>
                  <li>Equipment calibration and validation</li>
                  <li>Continuous process improvement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">External Validation</h3>
                <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Third-party laboratory accreditation</li>
                  <li>Peer review by external experts</li>
                  <li>Court testimony and cross-examination</li>
                  <li>Professional certification maintenance</li>
                  <li>Industry best practice adoption</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            📞 Chain of Custody Inquiries
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            For questions about our chain of custody procedures or to request documentation for your case:
          </p>
          <div className="space-y-2 text-blue-700 dark:text-blue-300">
            <p><strong>Email:</strong> custody@cyberprobes.com</p>
            <p><strong>Phone:</strong> +91 7007351691</p>
            <p><strong>Emergency:</strong> Available 24/7 for urgent custody matters</p>
          </div>
        </div>
      </div>
    </div>
  );
}
