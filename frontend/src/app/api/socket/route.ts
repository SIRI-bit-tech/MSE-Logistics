import { NextRequest, NextResponse } from 'next/server'
import Ably from 'ably'

let ablyClient: Ably.Realtime | undefined

// Initialize Ably client connection
function initializeAblyClient(): Ably.Realtime | null {
  if (!ablyClient) {
    const ablyApiKey = process.env.ABLY_API_KEY
    
    if (!ablyApiKey) {
      console.warn('No Ably API key configured. Set ABLY_API_KEY environment variable.')
      return null
    }

    try {
      ablyClient = new Ably.Realtime({
        key: ablyApiKey,
        autoConnect: true,
      })

      ablyClient.connection.on('connected', () => {
        console.log('Connected to Ably realtime service')
      })

      ablyClient.connection.on('disconnected', () => {
        console.log('Disconnected from Ably realtime service')
      })

      ablyClient.connection.on('failed', (error: any) => {
        console.error('Ably connection failed:', error)
      })

    } catch (error) {
      console.error('Failed to initialize Ably client:', error)
      return null
    }
  }
  
  return ablyClient
}

export async function GET(_request: NextRequest) {
  const ably = initializeAblyClient()
  
  if (!ably) {
    return NextResponse.json({ 
      error: 'Ably realtime service not configured',
      message: 'Set ABLY_API_KEY environment variable to enable real-time features'
    }, { status: 503 })
  }

  return NextResponse.json({ 
    message: 'Ably realtime client initialized',
    connected: ably.connection.state === 'connected' || ably.connection.state === 'connecting'
  })
}

// Helper function to emit tracking updates via Ably
export function emitTrackingUpdate(trackingNumber: string, data: any): void {
  const ably = initializeAblyClient()
  if (ably) {
    const channel = ably.channels.get(`tracking:${trackingNumber}`)
    channel.publish('tracking:updated', data).catch((error: any) => {
      console.error('Failed to publish tracking update:', error)
    })
  } else {
    console.warn('Ably client not available. Tracking update not sent:', trackingNumber)
  }
}

// Helper function to emit shipment updates via Ably
export function emitShipmentUpdate(userId: string, data: any): void {
  const ably = initializeAblyClient()
  if (ably) {
    const channel = ably.channels.get(`user:${userId}:shipments`)
    channel.publish('shipments:updated', data).catch((error: any) => {
      console.error('Failed to publish shipment update:', error)
    })
  } else {
    console.warn('Ably client not available. Shipment update not sent:', userId)
  }
}