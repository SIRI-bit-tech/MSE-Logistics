import { 
  Clock, 
  Loader, 
  PauseCircle, 
  PackageCheck, 
  Truck, 
  FileClock, 
  FileCheck, 
  Warehouse, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  RotateCcw, 
  XCircle,
  LucideIcon
} from "lucide-react"
import type { ShipmentStatus } from "../../global"

export const statusIcons: Record<ShipmentStatus, LucideIcon> = {
  PENDING: Clock,
  PROCESSING: Loader,
  ON_HOLD: PauseCircle,
  PICKED_UP: PackageCheck,
  IN_TRANSIT: Truck,
  IN_CUSTOMS: FileClock,
  CUSTOMS_CLEARED: FileCheck,
  ARRIVED_AT_FACILITY: Warehouse,
  OUT_FOR_DELIVERY: MapPin,
  DELIVERY_ATTEMPTED: AlertCircle,
  DELIVERED: CheckCircle,
  RETURNED: RotateCcw,
  CANCELLED: XCircle,
}

export function getStatusIcon(status: ShipmentStatus): LucideIcon {
  return statusIcons[status] || Clock
}

export function getStatusColor(status: ShipmentStatus): string {
  const colorMap: Record<ShipmentStatus, string> = {
    PENDING: 'text-yellow-600 bg-yellow-100',
    PROCESSING: 'text-blue-600 bg-blue-100',
    ON_HOLD: 'text-orange-600 bg-orange-100',
    PICKED_UP: 'text-green-600 bg-green-100',
    IN_TRANSIT: 'text-blue-600 bg-blue-100',
    IN_CUSTOMS: 'text-purple-600 bg-purple-100',
    CUSTOMS_CLEARED: 'text-green-600 bg-green-100',
    ARRIVED_AT_FACILITY: 'text-indigo-600 bg-indigo-100',
    OUT_FOR_DELIVERY: 'text-blue-600 bg-blue-100',
    DELIVERY_ATTEMPTED: 'text-orange-600 bg-orange-100',
    DELIVERED: 'text-green-600 bg-green-100',
    RETURNED: 'text-orange-600 bg-orange-100',
    CANCELLED: 'text-red-600 bg-red-100',
  }
  return colorMap[status] || 'text-gray-600 bg-gray-100'
}
