import Ably from "ably"

let ablyClient: Ably.Realtime | null = null

export async function initializeAbly(): Promise<Ably.Realtime | null> {
  if (ablyClient) {
    return ablyClient
  }

  try {
    // Get token from API
    const response = await fetch('/api/ably/token')
    if (!response.ok) {
      throw new Error('Failed to get Ably token')
    }
    
    ablyClient = new Ably.Realtime({
      authUrl: '/api/ably/token',
      autoConnect: true,
    })

    return ablyClient
  } catch (error) {
    return null
  }
}

export function getAblyClient(): Ably.Realtime | null {
  return ablyClient
}

export async function subscribeToTracking(trackingNumber: string, onUpdate: (data: any) => void) {
  const ably = await initializeAbly()
  if (!ably) return () => {}

  const channel = ably.channels.get(`tracking:${trackingNumber}`)
  channel.subscribe('tracking:updated', onUpdate)

  return () => {
    channel.unsubscribe('tracking:updated', onUpdate)
  }
}

export async function subscribeToShipments(userId: string, onUpdate: (data: any) => void) {
  const ably = await initializeAbly()
  if (!ably) return () => {}

  const channel = ably.channels.get(`user:${userId}:shipments`)
  channel.subscribe('shipments:updated', onUpdate)

  return () => {
    channel.unsubscribe('shipments:updated', onUpdate)
  }
}