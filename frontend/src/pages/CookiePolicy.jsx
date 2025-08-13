import React from 'react';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets_frontend/assets";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img src={assets.logo} alt="Logo" className="h-12" />
            <h1 className="text-2xl font-bold text-gray-800">Cookie Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Cookie Policy
            </h2>
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. What Are Cookies?
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit our website. They help us provide you with a better experience and allow certain features to work properly.</p>
                  <p>Cookies can be either "session cookies" (which are deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period of time).</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. How We Use Cookies
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>We use cookies for several important purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Provide insights into website usage and performance</li>
                    <li><strong>Marketing Cookies:</strong> Help deliver relevant content and advertisements</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. Types of Cookies We Use
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Essential Cookies</h4>
                    <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.</p>
                    <p className="text-sm text-gray-500 mt-2"><strong>Examples:</strong> Authentication cookies, security cookies, session management</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Performance Cookies</h4>
                    <p>These cookies collect information about how visitors use our website, such as which pages are visited most often and if users get error messages. This information helps us improve website performance.</p>
                    <p className="text-sm text-gray-500 mt-2"><strong>Examples:</strong> Google Analytics, page load times, error tracking</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Functional Cookies</h4>
                    <p>These cookies allow the website to remember choices you make and provide enhanced, more personal features. They may also be used to provide services you have requested.</p>
                    <p className="text-sm text-gray-500 mt-2"><strong>Examples:</strong> Language preferences, region settings, user interface customization</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Analytics Cookies</h4>
                    <p>These cookies help us understand how our website is being used and how we can improve it. They collect information about your browsing patterns and help us identify areas for improvement.</p>
                    <p className="text-sm text-gray-500 mt-2"><strong>Examples:</strong> User behavior analysis, conversion tracking, A/B testing</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Third-Party Cookies
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>Some cookies on our website are set by third-party services that we use to enhance your experience:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> Helps us understand website traffic and user behavior</li>
                    <li><strong>Payment Processors:</strong> Secure payment processing and fraud prevention</li>
                    <li><strong>Social Media:</strong> Integration with social media platforms for sharing and engagement</li>
                    <li><strong>Customer Support:</strong> Live chat and support ticket systems</li>
                  </ul>
                  <p>These third-party services have their own privacy policies and cookie practices, which we encourage you to review.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Cookie Management
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.</p>
                  <p><strong>Cookie Preferences:</strong> You can choose to accept or decline cookies. However, declining cookies may prevent you from taking full advantage of our website.</p>
                  <p><strong>Cookie Consent:</strong> When you first visit our website, you'll see a cookie consent banner that allows you to choose which types of cookies to accept.</p>
                  <p><strong>Opt-out Tools:</strong> You can use industry-standard opt-out tools to manage your cookie preferences across multiple websites.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. Specific Cookie Information
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Authentication Cookies</h4>
                    <p className="text-sm"><strong>Purpose:</strong> Keep you logged in and maintain your session</p>
                    <p className="text-sm"><strong>Duration:</strong> Session or up to 30 days</p>
                    <p className="text-sm"><strong>Data:</strong> User ID, session token, login status</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Preference Cookies</h4>
                    <p className="text-sm"><strong>Purpose:</strong> Remember your settings and preferences</p>
                    <p className="text-sm"><strong>Duration:</strong> Up to 1 year</p>
                    <p className="text-sm"><strong>Data:</strong> Language, theme, notification preferences</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Analytics Cookies</h4>
                    <p className="text-sm"><strong>Purpose:</strong> Understand website usage and improve performance</p>
                    <p className="text-sm"><strong>Duration:</strong> Up to 2 years</p>
                    <p className="text-sm"><strong>Data:</strong> Page views, time on site, user journey</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  7. Updates to This Policy
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                  <p>When we make changes, we will update the "Last updated" date at the top of this policy and notify you through our website or email communications.</p>
                  <p>We encourage you to review this policy periodically to stay informed about how we use cookies.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  8. Contact Us
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@prescripto.com</p>
                    <p><strong>Phone:</strong> +1-212-456-7890</p>
                    <p><strong>Address:</strong> 123 Healthcare Ave, Medical District, NY 10001</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                This Cookie Policy explains how Prescripto uses cookies and similar technologies to provide, 
                customize, evaluate, improve, promote, and protect our services. By using our website, 
                you agree to our use of cookies as described in this policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
