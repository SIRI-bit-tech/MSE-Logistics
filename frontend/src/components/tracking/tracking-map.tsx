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

  useEffect(() => {
    if (!mapContainer.current || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [shipment.senderLongitude, shipment.senderLatitude],
      zoom: 4,
    })

    // Add sender marker
    new mapboxgl.Marker({ color: "#003873" })
      .setLngLat([shipment.senderLongitude, shipment.senderLatitude])
      .setPopup(
        new mapboxgl.Popup().setHTML(`<strong>From:</strong><br/>${shipment.senderCity}, ${shipment.senderCountry}`),
      )
      .addTo(map.current)

    // Add recipient marker
    new mapboxgl.Marker({ color: "#FFD700" })
      .setLngLat([shipment.recipientLongitude, shipment.recipientLatitude])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<strong>To:</strong><br/>${shipment.recipientCity}, ${shipment.recipientCountry}`,
        ),
      )
      .addTo(map.current)

    // Fit bounds
    const bounds = new mapboxgl.LngLatBounds(
      [shipment.senderLongitude, shipment.senderLatitude],
      [shipment.recipientLongitude, shipment.recipientLatitude],
    )
    map.current.fitBounds(bounds, { padding: 100 })

    return () => {
      map.current?.remove()
    }
  }, [shipment])

  return <div ref={mapContainer} className="h-96 rounded-lg overflow-hidden shadow-md mb-6" />
}
