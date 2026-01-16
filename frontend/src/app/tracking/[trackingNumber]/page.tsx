"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useShipment } from "@/hooks/use-shipment"
import { useAuthStore } from "@/store/auth-store"
import { Plane, Truck, Ship, Zap, XCircle, RotateCcw, PauseCircle } from "lucide-react"
import { getStatusIcon } from "@/lib/status-icons"
import Sidebar from "@/components/dashboard/sidebar"
import TrackingMap from "@/components/tracking/tracking-map"
import TrackingStatusUpdates from "@/components/tracking/tracking-status-updates"
import { subscribeToTracking } from "@/lib/ably-client"

export default function TrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string
  const { selectedShipment, getShipmentDetails, isLoading } = useShipment()
  
  // Access auth state directly from store (initialized globally in Providers)
  const { isAuthenticated, isLoading: authLoading } = useAuthStore()

  useEffect(() => {
    if (trackingNumber && !authLoading) {
      getShipmentDetails(trackingNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingNumber, authLoading])

  // Subscribe to Ably for real-time updates
  useEffect(() => {
    if (!trackingNumber) return

    const unsubscribe = subscribeToTracking(trackingNumber, (message: any) => {
      // Refresh shipment data when update received
      getShipmentDetails(trackingNumber)
    })

    return () => {
      unsubscribe.then(unsub => unsub())
    }
  }, [trackingNumber, getShipmentDetails])

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
                <p className="font-semibold text-gray-900">
                  {selectedShipment.senderCity}, {selectedShipment.senderCountry}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Destination</p>
                <p className="font-semibold text-gray-900">
                  {selectedShipment.recipientCity}, {selectedShipment.recipientCountry}
                </p>
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
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${
                    selectedShipment.transportMode === 'AIR' ? 'animate-pulse' : ''
                  }`}>
                    <Plane className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Air</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'LAND' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${
                    selectedShipment.transportMode === 'LAND' ? 'animate-pulse' : ''
                  }`}>
                    <Truck className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Land</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'WATER' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${
                    selectedShipment.transportMode === 'WATER' ? 'animate-pulse' : ''
                  }`}>
                    <Ship className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-xs mt-1">Sea</span>
                </div>
                <div className={`flex flex-col items-center ${selectedShipment.transportMode === 'MULTIMODAL' ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${
                    selectedShipment.transportMode === 'MULTIMODAL' ? 'animate-pulse' : ''
                  }`}>
                    <Zap className="w-6 h-6 text-gray-700" />
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
        <div>
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
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {content}
        </div>
      </div>
    )
  }

  // Unauthenticated users - LayoutWrapper handles navbar/footer
  return content
}
