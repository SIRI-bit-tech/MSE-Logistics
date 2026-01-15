"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import type { Shipment } from "../../../global"

interface TrackingMapProps {
  shipment: Shipment
}

export default function TrackingMap({ shipment }: TrackingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [routeError, setRouteError] = useState<string | null>(null)

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
    if (!mapContainer.current || !hasValidCoordinates) return

    // Initialize MapLibre GL JS with OpenStreetMap tiles
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: hasCurrentLocation 
        ? [shipment.currentLongitude!, shipment.currentLatitude!]
        : [shipment.senderLongitude, shipment.senderLatitude],
      zoom: 4,
    })

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Check if current location is at origin
    const isAtOrigin = hasCurrentLocation && 
      Math.abs(shipment.currentLatitude! - shipment.senderLatitude) < 0.01 &&
      Math.abs(shipment.currentLongitude! - shipment.senderLongitude) < 0.01

    // Create custom marker elements
    const createMarkerElement = (color: string) => {
      const el = document.createElement('div')
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.cursor = 'pointer'
      el.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C10.48 0 6 4.48 6 10C6 17.5 16 32 16 32C16 32 26 17.5 26 10C26 4.48 21.52 0 16 0Z" fill="${color}"/>
          <circle cx="16" cy="10" r="4" fill="white"/>
        </svg>
      `
      return el
    }

    // Add sender marker (origin) - Green
    new maplibregl.Marker({ 
      element: createMarkerElement('#10B981'),
      anchor: 'bottom'
    })
      .setLngLat([shipment.senderLongitude, shipment.senderLatitude])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <div class="font-semibold text-sm">Origin</div>
          <div class="text-xs text-gray-600">${shipment.senderCity}, ${shipment.senderCountry}</div>
        </div>`
      ))
      .addTo(map.current)

    // Add recipient marker (destination) - Gold
    new maplibregl.Marker({ 
      element: createMarkerElement('#D4AF37'),
      anchor: 'bottom'
    })
      .setLngLat([shipment.recipientLongitude, shipment.recipientLatitude])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <div class="font-semibold text-sm">Destination</div>
          <div class="text-xs text-gray-600">${shipment.recipientCity}, ${shipment.recipientCountry}</div>
        </div>`
      ))
      .addTo(map.current)

    // Add current location marker - Blue
    if (hasCurrentLocation && !isAtOrigin) {
      const el = document.createElement('div')
      el.style.width = '40px'
      el.style.height = '40px'
      el.style.cursor = 'pointer'
      el.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#3B82F6" opacity="0.3"/>
          <circle cx="20" cy="20" r="12" fill="#3B82F6"/>
          <circle cx="20" cy="20" r="6" fill="white"/>
        </svg>
      `

      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([shipment.currentLongitude!, shipment.currentLatitude!])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <div class="font-semibold text-sm">Current Location</div>
            <div class="text-xs text-gray-600">${shipment.currentLocation || 'In Transit'}</div>
          </div>`
        ))
        .addTo(map.current)
    }

    // Fetch route from GraphHopper and draw it
    map.current.on('load', async () => {
      if (!map.current) return

      try {
        // Determine routing profile based on transport mode
        let profile = 'car'
        switch (shipment.transportMode) {
          case 'AIR':
            // For air transport, use direct routing (straight line is more appropriate)
            profile = 'car' // GraphHopper doesn't have air routing, use car for waypoints
            break
          case 'WATER':
            // For sea transport, use direct routing (no sea routing in GraphHopper)
            profile = 'car' // Will show direct path between ports
            break
          case 'LAND':
            profile = 'car' // Road routing for trucks
            break
          case 'MULTIMODAL':
            profile = 'car' // Combined routing
            break
        }

        // Build waypoints for GraphHopper
        const waypoints = hasCurrentLocation && !isAtOrigin
          ? [
              [shipment.senderLongitude, shipment.senderLatitude],
              [shipment.currentLongitude!, shipment.currentLatitude!],
              [shipment.recipientLongitude, shipment.recipientLatitude]
            ]
          : [
              [shipment.senderLongitude, shipment.senderLatitude],
              [shipment.recipientLongitude, shipment.recipientLatitude]
            ]

        // Fetch route from GraphHopper
        const pointsParam = waypoints.map(w => `point=${w[1]},${w[0]}`).join('&')
        const apiKey = process.env.NEXT_PUBLIC_GRAPHHOPPER_API_KEY
        
        if (!apiKey) {
          console.warn('GraphHopper API key not found. Please add NEXT_PUBLIC_GRAPHHOPPER_API_KEY to your .env.local file')
        }
        
        const graphhopperUrl = `https://graphhopper.com/api/1/route?${pointsParam}&profile=${profile}&points_encoded=false&key=${apiKey}`
        
        let routeCoordinates: number[][] = []
        
        // For AIR and WATER transport, use straight lines (more appropriate than road routing)
        if (shipment.transportMode === 'AIR' || shipment.transportMode === 'WATER') {
          routeCoordinates = waypoints
        } else {
          // For LAND and MULTIMODAL, fetch route from GraphHopper
          try {
            const response = await fetch(graphhopperUrl)
            if (response.ok) {
              const data = await response.json()
              if (data.paths && data.paths[0] && data.paths[0].points) {
                routeCoordinates = data.paths[0].points.coordinates
              } else {
                // Fallback to straight lines if no route found
                routeCoordinates = waypoints
              }
            } else {
              console.error('GraphHopper API error:', response.status)
              routeCoordinates = waypoints
            }
          } catch (error) {
            console.error('Error fetching route from GraphHopper:', error)
            routeCoordinates = waypoints
          }
        }

        // Add route source and layer
        map.current!.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }
        })

        // Add route line layer
        map.current!.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#D4AF37',
            'line-width': 3,
            'line-opacity': 0.8
          }
        })

        // Add route outline for better visibility
        map.current!.addLayer({
          id: 'route-outline',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ffffff',
            'line-width': 5,
            'line-opacity': 0.4
          }
        }, 'route')

      } catch (error) {
        console.error('Error fetching route:', error)
        setRouteError('Unable to load route')
      }
    })

    // Fit bounds to show all markers
    const bounds = new maplibregl.LngLatBounds()
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
      {routeError && (
        <div className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded text-sm">
          {routeError}
        </div>
      )}
    </div>
  )
}