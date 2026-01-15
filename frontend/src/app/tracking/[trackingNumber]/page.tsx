"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useShipment } from "@/hooks/use-shipment"
import { useAuth } from "@/hooks/use-auth"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import TrackingMap from "@/components/tracking/tracking-map"
import TrackingStatusUpdates from "@/components/tracking/tracking-status-updates"

export default function TrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string
  const { selectedShipment, getShipmentDetails, isLoading } = useShipment()
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (trackingNumber) {
      getShipmentDetails(trackingNumber)
    }
  }, [trackingNumber])

  if (isLoading || authLoading || !selectedShipment) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Loading tracking information...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  const content = (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Tracking Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Header Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase mb-1">Tracking Number</p>
                <h1 className="text-3xl font-bold text-gray-900">{selectedShipment.trackingNumber}</h1>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
                {selectedShipment.status.replace(/_/g, ' ')}
              </div>
            </div>

            {/* Origin, Destination, Delivery, Weight */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Origin</p>
                <p className="font-semibold text-gray-900">{selectedShipment.senderCity}, {selectedShipment.senderCountry.substring(0, 2)}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Destination</p>
                <p className="font-semibold text-gray-900">{selectedShipment.recipientCity}, {selectedShipment.recipientCountry.substring(0, 2)}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Est. Delivery</p>
                <p className="font-semibold text-gray-900">
                  {selectedShipment.estimatedDeliveryDate 
                    ? new Date(selectedShipment.estimatedDeliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'TBD'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Weight</p>
                <p className="font-semibold text-gray-900">{selectedShipment.weight.toLocaleString()} kg</p>
              </div>
            </div>

            {/* Transport Mode Icons */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 uppercase mb-3">Transport Mode</p>
              <div className="flex gap-4">
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'AIR' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Air</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'LAND' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Land</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'WATER' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚢</span>
                  </div>
                  <span className="text-xs mt-1">Sea</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'MULTIMODAL' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Multi</span>
                </div>
              </div>
            </div>

            {/* Status Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                {['Pending', 'Processing', 'In Transit', 'Delivery', 'Delivered'].map((step, index) => {
                  const statusMap = ['PENDING', 'PROCESSING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED']
                  const currentIndex = statusMap.indexOf(selectedShipment.status)
                  const isActive = index <= currentIndex
                  const isCurrent = index === currentIndex
                  
                  return (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCurrent ? 'bg-yellow-400' : isActive ? 'bg-gray-400' : 'bg-gray-200'
                      }`}>
                        {isActive ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <span className="text-xs mt-2 text-center">{step}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Map */}
          <TrackingMap shipment={selectedShipment} />
        </div>

        {/* Right Column - Status Updates */}
        <div>
          <TrackingStatusUpdates 
            events={selectedShipment.trackingEvents} 
            status={selectedShipment.status}
          />
        </div>
      </div>
    </div>
  )

  // Conditional layout based on authentication
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {content}
        </div>
      </div>
    )
  }

  // Unauthenticated users see navbar
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {content}
    </div>
  )
}
