'use client';

import { useState, useRef } from 'react';
import { Metadata } from 'next';
import ReCAPTCHA from 'react-google-recaptcha';

// Note: This metadata will be applied at the layout level since this is a client component
// For client components, metadata should be defined in the parent layout or a separate metadata file
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Sanitize input values to prevent invalid characters
    if (name === 'name') {
      // Only allow letters, spaces, periods, hyphens, and apostrophes
      const sanitizedValue = value.replace(/[^A-Za-z\s\.\-']/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === 'phone') {
      // Only allow numbers, parentheses, hyphens, spaces, and plus
      const sanitizedValue = value.replace(/[^0-9()\-\s+]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate as user types
    if (name === 'name') {
      // Check if name contains any numbers
      if (/\d/.test(value)) {
        setFormErrors(prev => ({ ...prev, name: 'Name should not contain numbers' }));
      }
    } else if (name === 'email') {
      // Validate email format
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    } else if (name === 'phone') {
      // Validate phone number (optional) - only allow numbers, parentheses, hyphens, spaces, and plus
      if (value && !/^[0-9()\-\s+]+$/.test(value)) {
        setFormErrors(prev => ({ ...prev, phone: 'Phone number should only contain numbers, parentheses, hyphens, spaces, and plus sign' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check reCAPTCHA
    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification.');
      return;
    }
    
    // Validate form before submission
    let hasErrors = false;
    const newErrors = { name: '', email: '', phone: '' };
    
    // Name validation
    if (/\d/.test(formData.name)) {
      newErrors.name = 'Name should not contain numbers';
      hasErrors = true;
    }
    
    // Email validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }
    
    // Phone validation (if provided)
    if (formData.phone && !/^[0-9()\-\s+]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      hasErrors = true;
    }
    
    setFormErrors(newErrors);
    
    // Stop submission if there are errors
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: '',
      });
      // Reset reCAPTCHA
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Have questions or ready to secure your digital assets? Reach out to our team of cybersecurity experts.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="lg:w-2/5 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">7007351691</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Monday-Saturday, 9:00am-10:00pm IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">info@cyberprobes.in</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Office Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Rajajipuram</p>
                    <p className="text-gray-600 dark:text-gray-300">Lucknow, Uttar Pradesh</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 p-3 rounded-full transition duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 p-3 rounded-full transition duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/cyberprobes/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 p-3 rounded-full transition duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Emergency Response</h3>
              <p className="mb-4">
                Experiencing a security incident or breach? Our emergency response team is available 24/7.
              </p>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-bold">7007351691</span>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:w-3/5">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Message Received!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)} 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        pattern="^[A-Za-z\s\.\-']+$"
                        title="Name should only contain letters, spaces, periods, hyphens, or apostrophes"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your name"
                        maxLength={50}
                      />
                      {formErrors.name && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter a valid email address"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="^[0-9()\-\s+]+$"
                        title="Phone number should only contain numbers, parentheses, hyphens, spaces, and plus sign"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="(555) 123-4567"
                        maxLength={15}
                      />
                      {formErrors.phone && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service You're Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Please select a service</option>
                      <option value="Penetration Testing">Penetration Testing</option>
                      <option value="Security Assessment">Security Assessment</option>
                      <option value="Digital Forensics">Digital Forensics</option>
                      <option value="Incident Response">Incident Response</option>
                      <option value="Security Training">Security Training</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  
                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} // Test key
                      onChange={(token) => setRecaptchaToken(token)}
                      onExpired={() => setRecaptchaToken(null)}
                      theme="light"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">How quickly can you respond to incidents?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our emergency response team is available 24/7, and we typically start the initial response within 1-2 hours of notification for critical incidents.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Do you offer retainer services?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, we offer monthly and annual retainer packages that provide priority response, regular assessments, and ongoing support tailored to your needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Are your services available internationally?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, we serve clients globally with both remote services and on-site engagements when necessary. Our team can accommodate various time zones and requirements.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">How do you handle client confidentiality?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We take confidentiality extremely seriously. All client engagements are covered by strict NDAs, and we maintain the highest standards for data protection and privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 