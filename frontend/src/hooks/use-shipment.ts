import { useCallback } from "react"
import { useShipmentStore } from "@/store/shipment-store"

export function useShipment() {
  const {
    shipments,
    selectedShipment,
    isLoading,
    error,
    setShipments,
    setSelectedShipment,
    setLoading,
    setError,
    addShipment,
  } = useShipmentStore()

  const fetchShipments = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/shipments?skip=0&take=10`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch shipments')
      }
      
      const data = await response.json()
      setShipments(data.shipments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch shipments")
    } finally {
      setLoading(false)
    }
  }, [setLoading, setShipments, setError])

  const createShipment = useCallback(async (shipmentData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(shipmentData),
      })

      if (!response.ok) {
        throw new Error('Failed to create shipment')
      }

      const data = await response.json()
      const newShipment = data.shipment
      addShipment(newShipment)
      return newShipment
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create shipment")
      throw err
    } finally {
      setLoading(false)
    }
  }, [setLoading, addShipment, setError])

  const getShipmentDetails = useCallback(async (trackingNumber: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/tracking/${trackingNumber}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Shipment not found')
        }
        throw new Error('Failed to fetch shipment details')
      }
      
      const data = await response.json()
      const shipment = data.shipment
      setSelectedShipment(shipment)
      return shipment
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch shipment details")
    } finally {
      setLoading(false)
    }
  }, [setLoading, setSelectedShipment, setError])

  return {
    shipments,
    selectedShipment,
    isLoading,
    error,
    fetchShipments,
    createShipment,
    getShipmentDetails,
  }
}
