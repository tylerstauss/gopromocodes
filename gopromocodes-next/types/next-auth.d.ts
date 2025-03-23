import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    isAdmin: boolean
    username?: string
  }

  interface Session {
    user: User & {
      id: string
      isAdmin: boolean
      username?: string
    }
  }
} 