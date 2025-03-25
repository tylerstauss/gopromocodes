import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function updatePassword() {
  try {
    const hashedPassword = await hash('stauss11', 10)
    const updatedUser = await prisma.user.update({
      where: {
        email: 'tyler.e.stauss@gmail.com'
      },
      data: {
        password: hashedPassword
      }
    })
    console.log('Password updated successfully for user:', updatedUser.email)
  } catch (error) {
    console.error('Error updating password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updatePassword() 