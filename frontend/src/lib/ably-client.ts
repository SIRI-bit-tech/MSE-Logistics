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

    ablyClient.connection.on('connected', () => {
      console.log('Ably connected')
    })

    ablyClient.connection.on('disconnected', () => {
      console.log('Ably disconnected')
    })

    ablyClient.connection.on('failed', (error: any) => {
      console.error('Ably connection error:', error)
    })

    return ablyClient
  } catch (error) {
    console.error('Failed to initialize Ably:', error)
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