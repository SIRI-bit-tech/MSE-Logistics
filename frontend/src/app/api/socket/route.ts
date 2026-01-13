import { NextRequest, NextResponse } from 'next/server'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { createServer } from 'http'

let io: SocketIOServer | undefined

interface TrackingSubscription {
  trackingNumber: string
}

interface ShipmentSubscription {
  userId: string
}

// Initialize Socket.IO server
function initializeSocketServer(): SocketIOServer {
  if (!io) {
    const server = createServer()
    
    io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      },
      path: '/api/socket.io'
    })

    io.on('connection', (socket: Socket) => {
      // Handle tracking subscription
      socket.on('tracking:subscribe', ({ trackingNumber }: TrackingSubscription) => {
        socket.join(`tracking:${trackingNumber}`)
      })

      // Handle tracking unsubscription
      socket.on('tracking:unsubscribe', ({ trackingNumber }: TrackingSubscription) => {
        socket.leave(`tracking:${trackingNumber}`)
      })

      // Handle shipment updates subscription
      socket.on('shipments:subscribe', ({ userId }: ShipmentSubscription) => {
        socket.join(`user:${userId}:shipments`)
      })

      socket.on('disconnect', () => {
        // Client disconnected
      })
    })

    const port = process.env.SOCKET_PORT || 3002
    server.listen(port)
  }
  return io
}

export async function GET(_request: NextRequest) {
  initializeSocketServer()
  return NextResponse.json({ message: 'Socket.IO server initialized' })
}

// Helper function to emit tracking updates
export function emitTrackingUpdate(trackingNumber: string, data: any): void {
  const socketServer = initializeSocketServer()
  if (socketServer) {
    socketServer.to(`tracking:${trackingNumber}`).emit('tracking:updated', data)
  }
}

// Helper function to emit shipment updates
export function emitShipmentUpdate(userId: string, data: any): void {
  const socketServer = initializeSocketServer()
  if (socketServer) {
    socketServer.to(`user:${userId}:shipments`).emit('shipments:updated', data)
  }
}