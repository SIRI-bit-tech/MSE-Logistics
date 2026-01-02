import { create } from "zustand"
import type { Shipment } from "../../global"

interface ShipmentStore {
  shipments: Shipment[]
  selectedShipment: Shipment | null
  isLoading: boolean
  error: string | null
  setShipments: (shipments: Shipment[]) => void
  setSelectedShipment: (shipment: Shipment | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addShipment: (shipment: Shipment) => void
  updateShipment: (id: string, shipment: Partial<Shipment>) => void
}

export const useShipmentStore = create<ShipmentStore>((set) => ({
  shipments: [],
  selectedShipment: null,
  isLoading: false,
  error: null,

  setShipments: (shipments) => set({ shipments }),
  setSelectedShipment: (shipment) => set({ selectedShipment: shipment }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  addShipment: (shipment) =>
    set((state) => ({
      shipments: [shipment, ...state.shipments],
    })),

  updateShipment: (id, updates) =>
    set((state) => ({
      shipments: state.shipments.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      selectedShipment:
        state.selectedShipment?.id === id ? { ...state.selectedShipment, ...updates } : state.selectedShipment,
    })),
}))
