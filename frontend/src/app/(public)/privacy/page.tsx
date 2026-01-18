"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003873] to-[#0056b3] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-blue-200 mt-4">Last updated: January 18, 2026</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Mediterranean Shipping Express ("MSE," "we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our shipping and logistics services, including our website and mobile applications.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Information We Collect</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Name, email address, phone number, and mailing address</li>
              <li>• Account credentials and authentication information</li>
              <li>• Payment information (processed securely through third-party providers)</li>
              <li>• Shipping and delivery addresses</li>
              <li>• Business information for commercial accounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Shipment Information</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Package details (weight, dimensions, contents)</li>
              <li>• Tracking and delivery information</li>
              <li>• Shipping preferences and history</li>
              <li>• Location data for delivery tracking</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technical Information</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• IP address, browser type, and device information</li>
              <li>• Usage data and analytics</li>
              <li>• Cookies and similar tracking technologies</li>
              <li>• Performance and error logs</li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Delivery</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Process and fulfill shipping orders</li>
                  <li>• Provide tracking and delivery updates</li>
                  <li>• Handle customer support requests</li>
                  <li>• Manage your account and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Operations</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Improve our services and user experience</li>
                  <li>• Conduct analytics and research</li>
                  <li>• Prevent fraud and ensure security</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• SSL/TLS encryption for data transmission</li>
                  <li>• Encrypted data storage</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Multi-factor authentication</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Operational Safeguards</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Access controls and employee training</li>
                  <li>• Regular backup and recovery procedures</li>
                  <li>• Incident response protocols</li>
                  <li>• Third-party security assessments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Your Privacy Rights</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Access:</strong>
                  <span className="text-gray-700"> Request a copy of your personal information</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Correction:</strong>
                  <span className="text-gray-700"> Update or correct inaccurate information</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Deletion:</strong>
                  <span className="text-gray-700"> Request deletion of your personal information</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Portability:</strong>
                  <span className="text-gray-700"> Receive your data in a portable format</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-bold m-0">Contact Us</h2>
            </div>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@mediterraneanshippingexpress.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> Mediterranean Shipping Express, Privacy Office, 123 Logistics Way, Shipping City, SC 12345</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
