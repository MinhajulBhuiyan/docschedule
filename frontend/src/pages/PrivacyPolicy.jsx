import React from 'react';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets_frontend/assets";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img src={assets.logo} alt="Logo" className="h-12" />
            <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
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
              Privacy Policy
            </h2>
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> February 2025
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Information We Collect
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Personal Information:</strong> Name, email address, phone number, date of birth, medical history, and appointment preferences.</p>
                  <p><strong>Health Information:</strong> Medical conditions, symptoms, treatment history, and prescription details shared during consultations.</p>
                  <p><strong>Technical Information:</strong> IP address, browser type, device information, and usage patterns on our platform.</p>
                  <p><strong>Payment Information:</strong> Credit card details, billing address, and transaction history (processed securely through third-party providers).</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. How We Use Your Information
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Service Provision:</strong> To schedule appointments, connect you with healthcare providers, and manage your account.</p>
                  <p><strong>Communication:</strong> To send appointment confirmations, reminders, and important updates about your healthcare.</p>
                  <p><strong>Improvement:</strong> To enhance our services, develop new features, and provide better user experience.</p>
                  <p><strong>Legal Compliance:</strong> To comply with healthcare regulations, protect user safety, and respond to legal requests.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. Information Sharing
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Healthcare Providers:</strong> Your medical information is shared only with authorized healthcare professionals involved in your care.</p>
                  <p><strong>Service Partners:</strong> We may share data with trusted third-party services for payment processing, analytics, and customer support.</p>
                  <p><strong>Legal Requirements:</strong> Information may be disclosed if required by law or to protect user safety and platform security.</p>
                  <p><strong>Never Sold:</strong> We will never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Data Security
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Encryption:</strong> All data is encrypted using industry-standard SSL/TLS protocols during transmission and storage.</p>
                  <p><strong>Access Control:</strong> Strict access controls limit employee access to user data based on job requirements.</p>
                  <p><strong>Regular Audits:</strong> We conduct regular security assessments and updates to maintain data protection standards.</p>
                  <p><strong>HIPAA Compliance:</strong> Our platform adheres to healthcare privacy regulations and industry best practices.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Your Rights
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Access:</strong> You can request a copy of all personal information we hold about you.</p>
                  <p><strong>Correction:</strong> You can update or correct inaccurate information in your profile.</p>
                  <p><strong>Deletion:</strong> You can request deletion of your account and associated data (subject to legal retention requirements).</p>
                  <p><strong>Portability:</strong> You can export your data in a machine-readable format.</p>
                  <p><strong>Opt-out:</strong> You can unsubscribe from non-essential communications while maintaining service-related notifications.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. Contact Us
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@docschedule.com</p>
                    <p><strong>Phone:</strong> +8801875602306</p>
                    <p><strong>Address:</strong> Uttara Dhaka, Bangladesh</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                This privacy policy is effective as of the date listed above and may be updated periodically. 
                We will notify users of any material changes through our platform or email communications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
