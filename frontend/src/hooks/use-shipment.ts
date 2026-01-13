import { useShipmentStore } from "@/store/shipment-store"
import axios from "axios"
import { APP_URL } from "../../constants"

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
      
      // Check for GraphQL errors first
      if (response.data.errors) {
        const errorMessage = response.data.errors[0]?.message || "GraphQL error occurred"
        setError(errorMessage)
        return
      }
      
      // Only set shipments if data exists
      if (response.data && response.data.data && response.data.data.getUserShipments) {
        setShipments(response.data.data.getUserShipments)
      } else {
        setError("No shipment data received")
      }
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
      
      // Check for GraphQL errors first
      if (response.data.errors) {
        const errorMessage = response.data.errors[0]?.message || "GraphQL error occurred"
        setError(errorMessage)
        throw new Error(errorMessage)
      }
      
      // Only process data if it exists
      if (response.data && response.data.data && response.data.data.createShipment) {
        const newShipment = response.data.data.createShipment
        addShipment(newShipment)
        return newShipment
      } else {
        const errorMessage = "No shipment data received"
        setError(errorMessage)
        throw new Error(errorMessage)
      }
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
      
      // Check for GraphQL errors first
      if (response.data.errors) {
        const errorMessage = response.data.errors[0]?.message || "GraphQL error occurred"
        setError(errorMessage)
        return
      }
      
      // Only set shipment if data exists
      if (response.data && response.data.data && response.data.data.getShipmentByTracking) {
        const shipment = response.data.data.getShipmentByTracking
        setSelectedShipment(shipment)
        return shipment
      } else {
        setError("No shipment details received")
      }
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
