import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/mse-logo.png" alt="MSE Logo" className="w-10 h-10 mr-3" />
              <h4 className="font-bold text-xl">Mediterranean Shipping Express</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              A global leader in shipping and logistics, connecting businesses worldwide with reliable, 
              efficient, and sustainable transportation solutions across ocean, land, and air.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-6 text-lg text-msc-yellow">Services</h5>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/services/ocean-freight" className="hover:text-msc-yellow transition-colors">
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link href="/services/intermodal" className="hover:text-msc-yellow transition-colors">
                  Intermodal Transport
                </Link>
              </li>
              <li>
                <Link href="/services/warehousing" className="hover:text-msc-yellow transition-colors">
                  Warehousing & Storage
                </Link>
              </li>
              <li>
                <Link href="/services/supply-chain" className="hover:text-msc-yellow transition-colors">
                  Supply Chain Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-6 text-lg text-msc-yellow">Company</h5>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-msc-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-msc-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-msc-yellow transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-msc-yellow transition-colors">
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2026 Mediterranean Shipping Express. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-msc-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-msc-yellow transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-msc-yellow transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
