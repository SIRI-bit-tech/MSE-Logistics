import { registerEnumType } from "@nestjs/graphql"

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum ShipmentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  ON_HOLD = "ON_HOLD",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  IN_CUSTOMS = "IN_CUSTOMS",
  CUSTOMS_CLEARED = "CUSTOMS_CLEARED",
  ARRIVED_AT_FACILITY = "ARRIVED_AT_FACILITY",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERY_ATTEMPTED = "DELIVERY_ATTEMPTED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

export enum TransportMode {
  AIR = "AIR",
  LAND = "LAND",
  WATER = "WATER",
  MULTIMODAL = "MULTIMODAL",
}

export enum ServiceType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
  OVERNIGHT = "OVERNIGHT",
  FREIGHT = "FREIGHT",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum NotificationType {
  SHIPMENT_CREATED = "SHIPMENT_CREATED",
  SHIPMENT_PICKED_UP = "SHIPMENT_PICKED_UP",
  SHIPMENT_IN_TRANSIT = "SHIPMENT_IN_TRANSIT",
  SHIPMENT_OUT_FOR_DELIVERY = "SHIPMENT_OUT_FOR_DELIVERY",
  SHIPMENT_DELIVERED = "SHIPMENT_DELIVERED",
  SHIPMENT_ISSUE = "SHIPMENT_ISSUE",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
}

// Register enums for GraphQL
registerEnumType(UserRole, { name: "UserRole" })
registerEnumType(ShipmentStatus, { name: "ShipmentStatus" })
registerEnumType(TransportMode, { name: "TransportMode" })
registerEnumType(ServiceType, { name: "ServiceType" })
registerEnumType(PaymentStatus, { name: "PaymentStatus" })
registerEnumType(NotificationType, { name: "NotificationType" })
