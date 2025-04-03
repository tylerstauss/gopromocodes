import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Don't send the password hash back
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const data = await request.json()
    
    // Basic validation
    if (!data.username || !data.email) {
      return NextResponse.json(
        { message: 'Username and email are required' },
        { status: 400 }
      )
    }

    // Check if username or email already exists for another user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email }
        ],
        NOT: {
          id
        }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username or email already exists' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin || false
      }
    })

    // Don't send the password hash back
    const { password, ...userWithoutPassword } = updatedUser
    return NextResponse.json({
      message: 'User updated successfully',
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    // Don't allow deleting the current user
    if (session.user.id === id.toString()) {
      return NextResponse.json(
        { message: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    )
  }
} 