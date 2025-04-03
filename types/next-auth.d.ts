import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    username: string
    isAdmin: boolean
  }

  interface Session {
    user: User & {
      id: string
      isAdmin: boolean
      username: string
    }
  }
} 