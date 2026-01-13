import { useShipmentStore } from "@/store/shipment-store"
import axios from "axios"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

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
    updateShipment,
  } = useShipmentStore()

  const fetchShipments = async (userId: string) => {
    setLoading(true)
    try {
      const query = `
        query GetUserShipments($userId: String!, $skip: Int!, $take: Int!) {
          getUserShipments(userId: $userId, skip: $skip, take: $take) {
            id
            trackingNumber
            status
            createdAt
            recipientCity
            recipientCountry
          }
        }
      `

      const response = await axios.post(APP_URL, { query, variables: { userId, skip: 0, take: 10 } })
      setShipments(response.data.data.getUserShipments)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch shipments")
    } finally {
      setLoading(false)
    }
  }

  const createShipment = async (shipmentData: any) => {
    setLoading(true)
    try {
      const mutation = `
        mutation CreateShipment($input: CreateShipmentInput!) {
          createShipment(input: $input) {
            id
            trackingNumber
            status
            totalCost
          }
        }
      `

      const response = await axios.post(APP_URL, { query: mutation, variables: { input: shipmentData } })
      const newShipment = response.data.data.createShipment
      addShipment(newShipment)
      return newShipment
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create shipment")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getShipmentDetails = async (trackingNumber: string) => {
    setLoading(true)
    try {
      const query = `
        query GetShipment($trackingNumber: String!) {
          getShipmentByTracking(trackingNumber: $trackingNumber) {
            id
            trackingNumber
            status
            estimatedDeliveryDate
            trackingEvents {
              id
              status
              location
              city
              country
              description
              createdAt
            }
          }
        }
      `

      const response = await axios.post(APP_URL, { query, variables: { trackingNumber } })
      const shipment = response.data.data.getShipmentByTracking
      setSelectedShipment(shipment)
      return shipment
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch shipment details")
    } finally {
      setLoading(false)
    }
  }

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
