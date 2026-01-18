import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

// Only create Prisma client if we have a database URL
const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, Prisma client will not be available')
    return null
  }
  
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })
  } catch (error) {
    console.warn('Failed to create Prisma client:', error)
    return null
  }
}

export const prisma = globalThis.__prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.__prisma = prisma
}

// Type guard to ensure prisma is available
export const ensurePrisma = () => {
  if (!prisma) {
    throw new Error('Prisma client is not available. Check DATABASE_URL configuration.')
  }
  return prisma
}