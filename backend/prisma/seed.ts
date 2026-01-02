import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seed...")

  // Clear existing data
  await prisma.trackingSubscription.deleteMany()
  await prisma.driverNotification.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.driverLocation.deleteMany()
  await prisma.shipmentIssue.deleteMany()
  await prisma.refundRequest.deleteMany()
  await prisma.shipmentDocument.deleteMany()
  await prisma.trackingEvent.deleteMany()
  await prisma.shipmentAssignment.deleteMany()
  await prisma.shipment.deleteMany()
  await prisma.paymentMethod.deleteMany()
  await prisma.address.deleteMany()
  await prisma.driver.deleteMany()
  await prisma.user.deleteMany()

  // Create demo users
  const customer1 = await prisma.user.create({
    data: {
      auth0Id: "auth0|customer1",
      email: "customer1@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      auth0Id: "auth0|customer2",
      email: "customer2@example.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1987654321",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  })

  const adminUser = await prisma.user.create({
    data: {
      auth0Id: "auth0|admin",
      email: "admin@mse.com",
      firstName: "Admin",
      lastName: "User",
      phone: "+1555555555",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })

  // Create demo drivers
  const driver1 = await prisma.driver.create({
    data: {
      auth0Id: "auth0|driver1",
      email: "driver1@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      phone: "+1444444444",
      licenseNumber: "DL12345",
      licenseExpiry: new Date("2025-12-31"),
      vehicleNumber: "ABC123",
      vehicleType: "Van",
      status: "ACTIVE",
      currentLatitude: 40.7128,
      currentLongitude: -74.006,
    },
  })

  const driver2 = await prisma.driver.create({
    data: {
      auth0Id: "auth0|driver2",
      email: "driver2@example.com",
      firstName: "Sarah",
      lastName: "Williams",
      phone: "+1333333333",
      licenseNumber: "DL54321",
      licenseExpiry: new Date("2026-12-31"),
      vehicleNumber: "XYZ789",
      vehicleType: "Truck",
      status: "ACTIVE",
      currentLatitude: 34.0522,
      currentLongitude: -118.2437,
    },
  })

  // Create demo addresses
  const address1 = await prisma.address.create({
    data: {
      userId: customer1.id,
      type: "HOME",
      label: "Home",
      address: "123 Main Street",
      city: "New York",
      country: "USA",
      postalCode: "10001",
      latitude: 40.7128,
      longitude: -74.006,
      isDefault: true,
    },
  })

  const address2 = await prisma.address.create({
    data: {
      userId: customer2.id,
      type: "HOME",
      label: "Home",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
      latitude: 34.0522,
      longitude: -118.2437,
      isDefault: true,
    },
  })

  // Create demo shipments
  const shipment1 = await prisma.shipment.create({
    data: {
      trackingNumber: "SS-26-123456-ABCDEF",
      userId: customer1.id,
      senderName: "John Doe",
      senderEmail: "john@example.com",
      senderPhone: "+1234567890",
      senderAddress: "123 Main Street",
      senderCity: "New York",
      senderCountry: "USA",
      senderPostalCode: "10001",
      senderLatitude: 40.7128,
      senderLongitude: -74.006,
      recipientName: "Jane Smith",
      recipientEmail: "jane@example.com",
      recipientPhone: "+1987654321",
      recipientAddress: "456 Oak Avenue",
      recipientCity: "Los Angeles",
      recipientCountry: "USA",
      recipientPostalCode: "90001",
      recipientLatitude: 34.0522,
      recipientLongitude: -118.2437,
      packageType: "PARCEL",
      weight: 2.5,
      length: 30,
      width: 20,
      height: 15,
      description: "Electronics package",
      value: 500,
      currency: "USD",
      serviceType: "EXPRESS",
      transportMode: "AIR",
      status: "IN_TRANSIT",
      shippingCost: 45.99,
      insuranceCost: 5.0,
      totalCost: 50.99,
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  })

  const shipment2 = await prisma.shipment.create({
    data: {
      trackingNumber: "SS-26-654321-XYZABC",
      userId: customer2.id,
      senderName: "Jane Smith",
      senderEmail: "jane@example.com",
      senderPhone: "+1987654321",
      senderAddress: "456 Oak Avenue",
      senderCity: "Los Angeles",
      senderCountry: "USA",
      senderPostalCode: "90001",
      senderLatitude: 34.0522,
      senderLongitude: -118.2437,
      recipientName: "John Doe",
      recipientEmail: "john@example.com",
      recipientPhone: "+1234567890",
      recipientAddress: "123 Main Street",
      recipientCity: "New York",
      recipientCountry: "USA",
      recipientPostalCode: "10001",
      recipientLatitude: 40.7128,
      recipientLongitude: -74.006,
      packageType: "DOCUMENTS",
      weight: 0.5,
      length: 25,
      width: 17.5,
      height: 1,
      description: "Important documents",
      value: 100,
      currency: "USD",
      serviceType: "STANDARD",
      transportMode: "LAND",
      status: "DELIVERED",
      shippingCost: 15.99,
      insuranceCost: 0,
      totalCost: 15.99,
      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      actualDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  })

  // Create tracking events
  await prisma.trackingEvent.create({
    data: {
      shipmentId: shipment1.id,
      status: "PICKED_UP",
      location: "New York Distribution Center",
      city: "New York",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.006,
      facility: "NYC-01",
      description: "Package picked up from sender",
      transportMode: "AIR",
      updatedBy: adminUser.id,
    },
  })

  await prisma.trackingEvent.create({
    data: {
      shipmentId: shipment1.id,
      status: "IN_TRANSIT",
      location: "Chicago International Airport",
      city: "Chicago",
      country: "USA",
      latitude: 41.8781,
      longitude: -87.6298,
      facility: "ORD-01",
      description: "Package in transit",
      transportMode: "AIR",
      updatedBy: adminUser.id,
    },
  })

  await prisma.trackingEvent.create({
    data: {
      shipmentId: shipment1.id,
      status: "OUT_FOR_DELIVERY",
      location: "Los Angeles Delivery Center",
      city: "Los Angeles",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
      facility: "LAX-01",
      description: "Package out for delivery",
      transportMode: "LAND",
      updatedBy: adminUser.id,
    },
  })

  await prisma.trackingEvent.create({
    data: {
      shipmentId: shipment2.id,
      status: "DELIVERED",
      location: "New York",
      city: "New York",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.006,
      description: "Package delivered",
      updatedBy: adminUser.id,
    },
  })

  // Create shipment assignments
  await prisma.shipmentAssignment.create({
    data: {
      shipmentId: shipment1.id,
      driverId: driver1.id,
      completedAt: null,
    },
  })

  await prisma.shipmentAssignment.create({
    data: {
      shipmentId: shipment2.id,
      driverId: driver2.id,
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  })

  // Create driver locations
  await prisma.driverLocation.create({
    data: {
      driverId: driver1.id,
      latitude: 34.0522,
      longitude: -118.2437,
      accuracy: 10,
    },
  })

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: customer1.id,
      shipmentId: shipment1.id,
      type: "SHIPMENT_IN_TRANSIT",
      title: "Shipment In Transit",
      message: "Your shipment SS-26-123456-ABCDEF is on its way",
      isRead: false,
    },
  })

  await prisma.notification.create({
    data: {
      userId: customer2.id,
      shipmentId: shipment2.id,
      type: "SHIPMENT_DELIVERED",
      title: "Delivery Confirmed",
      message: "Your shipment SS-26-654321-XYZABC has been delivered",
      isRead: true,
    },
  })

  console.log("Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
