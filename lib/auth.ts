import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { CustomPrismaAdapter } from '@/lib/auth-adapter'

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: CustomPrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error('Invalid email or password')
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid email or password')
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.username,
          username: user.username,
          isAdmin: user.isAdmin
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
        session.user.username = token.username as string
      }
      return session
    }
  }
} 