"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { Shipment } from "../../../global"

interface TrackingMapProps {
  shipment: Shipment
}

export default function TrackingMap({ shipment }: TrackingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Check if coordinates are available
  const hasValidCoordinates = 
    shipment.senderLatitude != null && 
    shipment.senderLongitude != null && 
    shipment.recipientLatitude != null && 
    shipment.recipientLongitude != null &&
    !isNaN(shipment.senderLatitude) &&
    !isNaN(shipment.senderLongitude) &&
    !isNaN(shipment.recipientLatitude) &&
    !isNaN(shipment.recipientLongitude)

  const hasCurrentLocation = 
    shipment.currentLatitude != null &&
    shipment.currentLongitude != null &&
    !isNaN(shipment.currentLatitude) &&
    !isNaN(shipment.currentLongitude)

  useEffect(() => {
    if (!mapContainer.current || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN || !hasValidCoordinates) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: hasCurrentLocation 
        ? [shipment.currentLongitude!, shipment.currentLatitude!]
        : [shipment.senderLongitude, shipment.senderLatitude],
      zoom: 4,
    })

    // Check if current location is at origin
    const isAtOrigin = hasCurrentLocation && 
      Math.abs(shipment.currentLatitude! - shipment.senderLatitude) < 0.01 &&
      Math.abs(shipment.currentLongitude! - shipment.senderLongitude) < 0.01

    // Add sender marker (origin)
    new mapboxgl.Marker({ color: "#10B981" })
      .setLngLat([shipment.senderLongitude, shipment.senderLatitude])
      .addTo(map.current)

    // Add recipient marker (destination)
    new mapboxgl.Marker({ color: "#D4AF37" })
      .setLngLat([shipment.recipientLongitude, shipment.recipientLatitude])
      .addTo(map.current)

    // Add current location marker with custom popup
    if (hasCurrentLocation && !isAtOrigin) {
        // Create custom marker element
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.width = '40px'
        el.style.height = '40px'
        el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzNCODJGNiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+PC9zdmc+)'
        el.style.backgroundSize = 'contain'
        el.style.cursor = 'pointer'

        new mapboxgl.Marker(el)
          .setLngLat([shipment.currentLongitude!, shipment.currentLatitude!])
          .addTo(map.current)

        // Add live position popup (safe DOM construction)
        const popup = document.createElement('div')
        popup.className = 'absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg'
        
        const titleDiv = document.createElement('div')
        titleDiv.className = 'font-semibold'
        titleDiv.textContent = 'LIVE POSITION'
        
        const vesselDiv = document.createElement('div')
        vesselDiv.className = 'text-xs opacity-90'
        vesselDiv.textContent = `Vessel: ${shipment.currentLocation || 'MSE ADRIATIC'}`
        
        popup.appendChild(titleDiv)
        popup.appendChild(vesselDiv)
        el.appendChild(popup)
    }

    // Draw route line
    map.current.on('load', () => {
      if (!map.current) return

      // Dashed line from origin to destination
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: hasCurrentLocation && !isAtOrigin
              ? [
                  [shipment.senderLongitude, shipment.senderLatitude],
                  [shipment.currentLongitude!, shipment.currentLatitude!],
                  [shipment.recipientLongitude, shipment.recipientLatitude]
                ]
              : [
                  [shipment.senderLongitude, shipment.senderLatitude],
                  [shipment.recipientLongitude, shipment.recipientLatitude]
                ]
          }
        }
      })

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#D4AF37',
          'line-width': 2,
          'line-dasharray': [2, 2]
        }
      })
    })

    // Fit bounds to show all markers
    const bounds = new mapboxgl.LngLatBounds()
    bounds.extend([shipment.senderLongitude, shipment.senderLatitude])
    bounds.extend([shipment.recipientLongitude, shipment.recipientLatitude])
    if (hasCurrentLocation) {
      bounds.extend([shipment.currentLongitude!, shipment.currentLatitude!])
    }
    map.current.fitBounds(bounds, { padding: 80 })

    return () => {
      map.current?.remove()
    }
  }, [shipment, hasValidCoordinates, hasCurrentLocation])

  if (!hasValidCoordinates) {
    return (
      <div className="h-96 rounded-lg overflow-hidden shadow bg-gray-100 flex items-center justify-center">
        <div className="text-center p-6">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Unavailable</h3>
          <p className="text-sm text-gray-600">
            Route: {shipment.senderCity}, {shipment.senderCountry} → {shipment.recipientCity}, {shipment.recipientCountry}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-96 rounded-lg overflow-hidden shadow" />
    </div>
  )
}

