import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null

export function initializeSocket(): Socket {
  if (socket) {
    return socket
  }

  socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.on("connect", () => {
    console.log("Socket connected")
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected")
  })

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error)
  })

  return socket
}

export function getSocket(): Socket | null {
  return socket
}

export function subscribeToTracking(trackingNumber: string, onUpdate: (data: any) => void) {
  const socket = initializeSocket()
  socket.emit("tracking:subscribe", { trackingNumber })
  socket.on("tracking:updated", onUpdate)

  return () => {
    socket.emit("tracking:unsubscribe", { trackingNumber })
    socket.off("tracking:updated", onUpdate)
  }
}
