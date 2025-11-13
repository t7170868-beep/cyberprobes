import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Ensure DATABASE_URL has no accidental whitespace that breaks Prisma in production
if (process.env.DATABASE_URL) {
  const trimmed = process.env.DATABASE_URL.trim()
  if (trimmed !== process.env.DATABASE_URL) {
    process.env.DATABASE_URL = trimmed
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 