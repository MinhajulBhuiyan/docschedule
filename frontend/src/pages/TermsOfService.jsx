import React from 'react';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets_frontend/assets";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img src={assets.logo} alt="Logo" className="h-12" />
            <h1 className="text-2xl font-bold text-gray-800">Terms of Service</h1>
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
              Terms of Service
            </h2>
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Acceptance of Terms
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>By accessing and using docschedule.com ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  <p>These terms apply to all visitors, users, and others who access or use the Platform, including patients, healthcare providers, and administrators.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. Description of Service
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>docschedule is a healthcare platform that connects patients with qualified healthcare providers for medical consultations, appointment scheduling, and health management services.</p>
                  <p><strong>Our services include:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Online appointment booking and management</li>
                    <li>Virtual consultations with healthcare providers</li>
                    <li>Health record management and storage</li>
                    <li>Prescription management and refills</li>
                    <li>Health education and resources</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. User Responsibilities
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  <p><strong>Accurate Information:</strong> You must provide accurate, current, and complete information when creating an account and scheduling appointments.</p>
                  <p><strong>Medical Information:</strong> You are responsible for providing truthful and accurate medical information to healthcare providers.</p>
                  <p><strong>Appointment Attendance:</strong> You must attend scheduled appointments or cancel them within the specified timeframe to avoid cancellation fees.</p>
                  <p><strong>Prohibited Activities:</strong> You may not use the Platform for illegal purposes, harassment, or to transmit harmful content.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Healthcare Provider Terms
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Licensing:</strong> All healthcare providers must maintain valid licenses and certifications in their respective jurisdictions.</p>
                  <p><strong>Professional Standards:</strong> Providers must adhere to professional medical standards and ethical guidelines.</p>
                  <p><strong>Patient Care:</strong> Providers are responsible for the quality of care provided to patients through the Platform.</p>
                  <p><strong>Compliance:</strong> Providers must comply with all applicable healthcare laws and regulations, including HIPAA.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Payment and Billing
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Service Fees:</strong> Platform usage fees, consultation fees, and other charges will be clearly displayed before service provision.</p>
                  <p><strong>Payment Methods:</strong> We accept various payment methods including credit cards, debit cards, and digital wallets.</p>
                  <p><strong>Refunds:</strong> Refund policies vary by service type and are subject to our refund policy and applicable laws.</p>
                  <p><strong>Late Fees:</strong> Late payment or cancellation fees may apply as specified in our cancellation policy.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. Privacy and Data Protection
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                  <p>We implement appropriate security measures to protect your health information and comply with healthcare privacy regulations.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  7. Disclaimers and Limitations
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Medical Advice:</strong> The Platform facilitates connections between patients and healthcare providers but does not provide medical advice, diagnosis, or treatment.</p>
                  <p><strong>Emergency Situations:</strong> This Platform is not intended for emergency medical situations. In case of emergency, call emergency services immediately.</p>
                  <p><strong>Service Availability:</strong> We strive to maintain Platform availability but cannot guarantee uninterrupted access due to technical issues or maintenance.</p>
                  <p><strong>Third-party Services:</strong> We are not responsible for the quality or availability of third-party services integrated with our Platform.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  8. Termination
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>We may terminate or suspend your account and access to the Platform at any time, with or without cause, with or without notice.</p>
                  <p>You may terminate your account at any time by contacting our support team or using the account deletion feature in your profile settings.</p>
                  <p>Upon termination, your right to use the Platform will cease immediately, and we may delete your account and associated data.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  9. Changes to Terms
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes through our Platform or email communications.</p>
                  <p>Your continued use of the Platform after changes become effective constitutes acceptance of the new Terms.</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  10. Contact Information
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>If you have questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@docschedule.com</p>
                    <p><strong>Phone:</strong> +8801875602306</p>
                    <p><strong>Address:</strong> Uttara Dhaka, Bangladesh</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                These Terms of Service constitute the entire agreement between you and docschedule regarding the use of our Platform. 
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue to be effective.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
