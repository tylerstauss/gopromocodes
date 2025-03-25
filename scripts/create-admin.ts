import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash the password
  const password = 'stauss11'
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email: 'tyler.e.stauss@gmail.com',
      password: hashedPassword,
      username: 'tyler',
      isAdmin: true
    }
  })

  console.log('Admin user created:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 