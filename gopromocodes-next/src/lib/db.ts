import { prisma } from './prisma'

export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { success: true, message: 'Database connection successful' }
  } catch (error) {
    console.error('Database connection failed:', error)
    return { success: false, message: 'Database connection failed', error }
  }
} 