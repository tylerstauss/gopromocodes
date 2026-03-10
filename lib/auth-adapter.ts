import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const adapter = PrismaAdapter(prisma)

  return {
    ...adapter,
    getUser: async (id) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      })
      if (!user) return null
      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        emailVerified: null,
        name: user.username,
        image: null
      }
    },
    getUserByEmail: async (email) => {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      if (!user) return null
      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        emailVerified: null,
        name: user.username,
        image: null
      }
    },
    getUserByAccount: async ({ providerAccountId, provider }) => {
      const user = await prisma.user.findFirst({
        where: {
          googleId: providerAccountId
        }
      })
      if (!user) return null
      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        emailVerified: null,
        name: user.username,
        image: null
      }
    }
  }
} 