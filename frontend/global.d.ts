// Types for Mediterranean Shipping Express Application

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  profileImage?: string
  role: "CUSTOMER" | "DRIVER" | "ADMIN" | "SUPER_ADMIN"
  createdAt: Date
}

export interface Address {
  id: string
  type: "HOME" | "BUSINESS" | "OTHER"
  label: string
  address: string
  city: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "WALLET"
  cardLast4?: string
  cardBrand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface TrackingEvent {
  id: string
  status: ShipmentStatus
  location: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  facility?: string
  description: string
  transportMode?: TransportMode
  notes?: string
  updatedBy: string
  createdAt: Date
}

export interface Shipment {
  id: string
  trackingNumber: string
  userId: string

  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  senderLatitude: number
  senderLongitude: number

  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  recipientCity: string
  recipientCountry: string
  recipientPostalCode: string
  recipientLatitude: number
  recipientLongitude: number

  packageType: PackageType
  weight: number
  length: number
  width: number
  height: number
  description: string
  value: number
  currency: string

  serviceType: ServiceType
  transportMode: TransportMode
  status: ShipmentStatus

  shippingCost: number
  insuranceCost?: number
  totalCost: number

  estimatedDeliveryDate?: Date
  actualDeliveryDate?: Date
  deliverySignature?: string
  deliveryPhoto?: string
  recipientNameConfirm?: string

  customsStatus?: CustomsStatus
  customsDocuments: string[]

  notes?: string
  createdAt: Date
  updatedAt: Date

  trackingEvents: TrackingEvent[]
}

export type ShipmentStatus =
  | "PENDING"
  | "PROCESSING"
  | "ON_HOLD"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "IN_CUSTOMS"
  | "CUSTOMS_CLEARED"
  | "ARRIVED_AT_FACILITY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERY_ATTEMPTED"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED"

export type TransportMode = "AIR" | "LAND" | "WATER" | "MULTIMODAL"

export type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"

export type PackageType =
  | "DOCUMENTS"
  | "PARCEL"
  | "FRAGILE"
  | "ELECTRONICS"
  | "CLOTHING"
  | "FOOD"
  | "HAZARDOUS"
  | "OTHER"

export type CustomsStatus = "PENDING" | "IN_REVIEW" | "CLEARED" | "REJECTED" | "PENDING_PAYMENT"

export interface Driver {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  licenseNumber: string
  licenseExpiry: Date
  vehicleNumber: string
  vehicleType: string
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  currentLatitude?: number
  currentLongitude?: number
  totalDeliveries: number
  rating: number
}

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}
