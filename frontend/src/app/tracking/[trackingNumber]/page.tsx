"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useShipment } from "@/hooks/use-shipment"
import { useAuthStore } from "@/store/auth-store"
import { Plane, Truck, Ship, Zap } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import MobileHeader from "@/components/dashboard/mobile-header"
import TrackingMap from "@/components/tracking/tracking-map"
import TrackingStatusUpdates from "@/components/tracking/tracking-status-updates"
import { subscribeToTracking } from "@/lib/ably-client"

export default function TrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string
  const { selectedShipment, getShipmentDetails, isLoading } = useShipment()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Access auth state directly from store (initialized globally in Providers)
  const { isAuthenticated, isLoading: authLoading } = useAuthStore()

  useEffect(() => {
    if (trackingNumber && !authLoading) {
      getShipmentDetails(trackingNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingNumber, authLoading])

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Subscribe to Ably for real-time updates
  useEffect(() => {
    if (!trackingNumber) return

    let unsubscribeFn: (() => void) | null = null
    let isMounted = true

    // Subscribe and capture the unsubscribe function
    subscribeToTracking(trackingNumber, () => {
      // Refresh shipment data when update received
      if (isMounted) {
        getShipmentDetails(trackingNumber)
      }
    })
      .then((unsub) => {
        if (isMounted) {
          unsubscribeFn = unsub
        } else {
          // Component unmounted before subscription completed
          unsub()
        }
      })
      .catch(() => {
        // Handle subscription errors silently
      })

    return () => {
      isMounted = false
      if (unsubscribeFn) {
        unsubscribeFn()
      }
    }
  }, [trackingNumber, getShipmentDetails])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isLoading || authLoading || !selectedShipment) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg sm:text-xl mb-4">Loading tracking information...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  const content = (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Main Tracking Info */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Tracking Header Card */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col items-start sm:flex-row sm:justify-between mb-4 sm:mb-6 gap-4">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 uppercase mb-1">Tracking Number</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-all">
                  {selectedShipment.trackingNumber}
                </h1>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap">
                {selectedShipment.status.replace(/_/g, ' ').split(' ').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ')}
              </div>
            </div>

            {/* Origin, Destination, Delivery, Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 text-sm mt-8 border-t border-gray-100 pt-8">
              <div className="break-words pb-8 sm:pb-0 border-b sm:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Sender Details</p>
                <div className="text-gray-900 text-sm sm:text-base space-y-1">
                  <p className="font-bold text-base">{selectedShipment.senderName}</p>
                  <p className="text-gray-600 leading-relaxed">{selectedShipment.senderAddress}</p>
                  <p className="text-gray-600">{selectedShipment.senderCity}, {selectedShipment.senderCountry}</p>
                  {selectedShipment.senderPhone && (
                    <p className="text-gray-600 pt-1 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Phone:</span> {selectedShipment.senderPhone}
                    </p>
                  )}
                  {selectedShipment.senderEmail && (
                    <p className="text-gray-600 flex items-center gap-2 break-all">
                      <span className="text-xs text-gray-400">Email:</span> {selectedShipment.senderEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="break-words pb-8 sm:pb-0 border-b sm:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Receiver Details</p>
                <div className="text-gray-900 text-sm sm:text-base space-y-1">
                  <p className="font-bold text-base">{selectedShipment.recipientName}</p>
                  <p className="text-gray-600 leading-relaxed">{selectedShipment.recipientAddress}</p>
                  <p className="text-gray-600">{selectedShipment.recipientCity}, {selectedShipment.recipientCountry}</p>
                  {selectedShipment.recipientPhone && (
                    <p className="text-gray-600 pt-1 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Phone:</span> {selectedShipment.recipientPhone}
                    </p>
                  )}
                  {selectedShipment.recipientEmail && (
                    <p className="text-gray-600 flex items-center gap-2 break-all">
                      <span className="text-xs text-gray-400">Email:</span> {selectedShipment.recipientEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="pb-8 sm:pb-0 border-b lg:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Est. Delivery</p>
                <p className="font-bold text-gray-900 text-lg">
                  {selectedShipment.estimatedDeliveryDate
                    ? new Date(selectedShipment.estimatedDeliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'TBD'}
                </p>
              </div>

              <div className="pb-8 sm:pb-0 border-b lg:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Package Weight</p>
                <p className="font-bold text-gray-900 text-lg">{selectedShipment.weight.toLocaleString()} kg</p>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 text-sm mt-8 border-t border-gray-100 pt-8">
              <div className="pb-8 sm:pb-0 border-b sm:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Declared Value</p>
                <p className="font-bold text-gray-900 text-lg">
                  {selectedShipment.value ? `${selectedShipment.currency} ${selectedShipment.value.toLocaleString()}` : 'N/A'}
                </p>
              </div>

              <div className="pb-8 sm:pb-0 border-b sm:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Shipping Cost</p>
                <p className="font-bold text-gray-900 text-lg">
                  {selectedShipment.shippingCost ? `${selectedShipment.currency} ${selectedShipment.shippingCost.toLocaleString()}` : 'N/A'}
                </p>
              </div>

              <div className="pb-8 sm:pb-0 border-b sm:border-none border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Insurance</p>
                <p className="font-bold text-gray-900 text-lg">
                  {selectedShipment.insuranceCost ? `${selectedShipment.currency} ${selectedShipment.insuranceCost.toLocaleString()}` : 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Total Amount</p>
                <p className="font-bold text-msc-yellow text-xl">
                  {selectedShipment.totalCost ? `${selectedShipment.currency} ${selectedShipment.totalCost.toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Transport Mode Icons */}
            <div className="mt-4 sm:mt-6">
              <p className="text-sm text-gray-500 uppercase mb-3">Transport Mode</p>
              <div className="flex gap-3 sm:gap-4">
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'AIR' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center ${selectedShipment.transportMode === 'AIR' ? 'animate-pulse' : ''
                    }`}>
                    <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Air</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'LAND' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center ${selectedShipment.transportMode === 'LAND' ? 'animate-pulse' : ''
                    }`}>
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Land</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'WATER' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center ${selectedShipment.transportMode === 'WATER' ? 'animate-pulse' : ''
                    }`}>
                    <Ship className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Sea</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'MULTIMODAL' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center ${selectedShipment.transportMode === 'MULTIMODAL' ? 'animate-pulse' : ''
                    }`}>
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Multi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <TrackingMap shipment={selectedShipment} />
        </div>

        {/* Right Column - Status Updates */}
        <div className="xl:col-span-1">
          <TrackingStatusUpdates
            events={selectedShipment.trackingEvents}
            status={selectedShipment.status}
            createdAt={selectedShipment.createdAt}
          />
        </div>
      </div>
    </div>
  )

  // Conditional layout based on authentication
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <MobileHeader
            onMenuToggle={toggleSidebar}
            title="Track Shipment"
          />
          <div className="flex-1 overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    )
  }

  // Unauthenticated users - LayoutWrapper handles navbar/footer
  return content
}
