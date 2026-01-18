"use client"

import { motion } from "framer-motion"
import { FileText, Scale, Shield, AlertTriangle, Mail, CheckCircle } from "lucide-react"

export default function Terms() {
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
            <Scale className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our shipping and logistics services.
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
          {/* Agreement */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Agreement to Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Mediterranean Shipping Express ("MSE") services, you accept and agree to be bound by 
              the terms and provision of this agreement. These Terms of Service govern your use of our website, mobile 
              applications, and shipping services.
            </p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Our Services</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              MSE provides comprehensive shipping and logistics services including:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Services</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Express shipping (24-48 hours)</li>
                  <li>• Standard shipping (3-5 business days)</li>
                  <li>• International shipping and freight</li>
                  <li>• Specialized cargo handling</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Digital Services</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Real-time package tracking</li>
                  <li>• Online shipping management</li>
                  <li>• Mobile applications</li>
                  <li>• Customer support portal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">User Responsibilities</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Security</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• Maintain the confidentiality of your account credentials</li>
              <li>• Notify us immediately of any unauthorized access</li>
              <li>• Provide accurate and up-to-date information</li>
              <li>• Use services only for lawful purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Compliance</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Ensure all shipments comply with applicable laws and regulations</li>
              <li>• Provide accurate package descriptions and declarations</li>
              <li>• Properly package items to prevent damage</li>
              <li>• Pay all applicable fees and charges promptly</li>
            </ul>
          </div>

          {/* Prohibited Items */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-red-900 m-0">Prohibited Items</h2>
            </div>
            <p className="text-red-800 leading-relaxed mb-4">
              The following items are strictly prohibited from shipment:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Dangerous Materials</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Explosives and fireworks</li>
                  <li>• Flammable liquids and gases</li>
                  <li>• Toxic and corrosive substances</li>
                  <li>• Radioactive materials</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Restricted Items</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Illegal drugs and substances</li>
                  <li>• Weapons and ammunition</li>
                  <li>• Counterfeit goods</li>
                  <li>• Live animals (without proper permits)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Liability and Insurance */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Liability and Insurance</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coverage Limits</h3>
                <p className="text-gray-700">
                  MSE's liability for loss or damage is limited to the declared value of the shipment or the actual 
                  value, whichever is less. Additional insurance coverage is available for high-value items.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Claims Process</h3>
                <p className="text-gray-700">
                  Claims for loss or damage must be reported within 30 days of delivery or expected delivery date. 
                  All claims require proper documentation and proof of value.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Payment Terms</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Payment Due:</strong>
                  <span className="text-gray-700"> All charges are due at the time of service unless credit terms have been established</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Late Fees:</strong>
                  <span className="text-gray-700"> Overdue accounts may be subject to late fees and collection costs</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Disputed Charges:</strong>
                  <span className="text-gray-700"> Billing disputes must be reported within 60 days of invoice date</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900 m-0">Modifications to Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MSE reserves the right to modify these terms at any time. Changes will be effective immediately upon posting 
              on our website. Continued use of our services after changes constitutes acceptance of the modified terms. 
              We recommend reviewing these terms periodically.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-bold m-0">Questions About These Terms?</h2>
            </div>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact our legal department:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@mediterraneanshippingexpress.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> Mediterranean Shipping Express, Legal Department, 123 Logistics Way, Shipping City, SC 12345</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
