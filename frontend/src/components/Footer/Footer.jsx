import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets_frontend/assets'

const Footer = () => {
  const [isNewsletterExpanded, setIsNewsletterExpanded] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Footer sections data
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Mission', path: '/about#mission' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press & Media', path: '/press' },
        { name: 'Partnerships', path: '/partnerships' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Find Doctors', path: '/doctors' },
        { name: 'Book Appointments', path: '/appointments' },
        { name: 'Online Consultations', path: '/consultations' },
        { name: 'Health Records', path: '/health-records' },
        { name: 'Emergency Care', path: '/emergency' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Live Chat', path: '/chat' },
        { name: 'Report Issue', path: '/report' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
        { name: 'Data Protection', path: '/data-protection' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ]

  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: 'hover:bg-blue-400' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com', color: 'hover:bg-pink-500' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: 'hover:bg-blue-700' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com', color: 'hover:bg-red-600' }
  ]

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      // Handle newsletter subscription logic here
      console.log('Newsletter subscription:', newsletterEmail)
      setNewsletterEmail('')
      alert('Thank you for subscribing to our newsletter!')
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-dots-pattern"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Section - Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={assets.logo} 
                alt="DocSchedule Logo" 
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold">DocSchedule</span>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Connecting patients with trusted healthcare professionals. Book appointments, 
              get consultations, and manage your health journey with ease and confidence.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest health tips, doctor updates, and appointment reminders.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-white placeholder-gray-400"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        {/* Middle Section - Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section - Additional Info and Download */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Download App Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Download Our App</h4>
            <p className="text-gray-300 text-sm">
              Get the DocSchedule mobile app for a better experience on the go.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📍</span>
                <span>123 Healthcare Ave, Medical District, City 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">✉️</span>
                <span>support@docschedule.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">🕒</span>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} DocSchedule. All rights reserved.</p>
              <p className="mt-1">
                Made with ❤️ for better healthcare accessibility
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/sitemap" className="hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors duration-300">
                Accessibility
              </Link>
              <Link to="/feedback" className="hover:text-white transition-colors duration-300">
                Feedback
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">✓</span>
                </div>
                <p className="text-xs text-gray-400">HIPAA Compliant</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">🔒</span>
                </div>
                <p className="text-xs text-gray-400">Secure & Private</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">⭐</span>
                </div>
                <p className="text-xs text-gray-400">Trusted by Millions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-40"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}

export default Footer
