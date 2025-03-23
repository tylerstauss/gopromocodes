export * from './auth'
export * from './prisma'
export * from './db'
export { authOptions } from './auth'
export { default as prismaClient } from './prisma-client'
export { prisma } from './prisma-client'

// Also export as default for easier importing
import prismaClient from './prisma-client'
export default prismaClient 