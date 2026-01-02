export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql"

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// MSC Brand Colors - Exact match to MSC website
export const MSC_COLORS = {
  // Primary MSC Colors (only yellow/gold and neutrals)
  YELLOW: "#D4AF37", // MSC's signature golden yellow
  GOLD: "#B8860B",   // Darker gold variant
  
  // Neutral Colors (MSC uses clean whites and grays)
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#F8F9FA",
  MEDIUM_GRAY: "#6C757D",
  DARK_GRAY: "#343A40",
  BLACK: "#000000",
  
  // Text Colors
  TEXT_PRIMARY: "#212529",
  TEXT_SECONDARY: "#6C757D",
  TEXT_MUTED: "#ADB5BD",
  
  // Background Colors
  BG_PRIMARY: "#FFFFFF",
  BG_SECONDARY: "#F8F9FA",
  
  // Border Colors
  BORDER_LIGHT: "#DEE2E6",
  BORDER_MEDIUM: "#CED4DA",
}

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Track Shipment", href: "/track" },
]

// Company Information
export const COMPANY_INFO = {
  name: "Mediterranean Shipping Express",
  shortName: "MSE",
  tagline: "LEADER IN SHIPPING & LOGISTICS",
  description: "A global leader in shipping and logistics, connecting businesses worldwide with reliable, efficient, and sustainable transportation solutions.",
}

export const SHIPMENT_STATUS_COLORS: Record<string, string> = {
  PENDING: "warning",
  PROCESSING: "primary",
  ON_HOLD: "danger",
  PICKED_UP: "primary",
  IN_TRANSIT: "primary",
  IN_CUSTOMS: "secondary",
  CUSTOMS_CLEARED: "success",
  ARRIVED_AT_FACILITY: "primary",
  OUT_FOR_DELIVERY: "info",
  DELIVERY_ATTEMPTED: "warning",
  DELIVERED: "success",
  RETURNED: "danger",
  CANCELLED: "default",
}

export const SHIPMENT_STATUS_ICONS: Record<string, string> = {
  PENDING: "📦",
  PROCESSING: "⚙️",
  ON_HOLD: "⏸️",
  PICKED_UP: "🚚",
  IN_TRANSIT: "🚀",
  IN_CUSTOMS: "📋",
  CUSTOMS_CLEARED: "✅",
  ARRIVED_AT_FACILITY: "📍",
  OUT_FOR_DELIVERY: "🏃",
  DELIVERY_ATTEMPTED: "⚠️",
  DELIVERED: "🎉",
  RETURNED: "↩️",
  CANCELLED: "❌",
}

export const TRANSPORT_MODES = {
  AIR: "Airplane",
  LAND: "Ground",
  WATER: "Ship",
  MULTIMODAL: "Mixed",
}

export const SERVICE_TYPES = {
  EXPRESS: "Express (1-2 days)",
  STANDARD: "Standard (3-5 days)",
  ECONOMY: "Economy (7-10 days)",
}

export const PACKAGE_TYPES = [
  { value: "DOCUMENTS", label: "Documents" },
  { value: "PARCEL", label: "Parcel" },
  { value: "FRAGILE", label: "Fragile Items" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "CLOTHING", label: "Clothing" },
  { value: "FOOD", label: "Food Items" },
  { value: "HAZARDOUS", label: "Hazardous Materials" },
  { value: "OTHER", label: "Other" },
]