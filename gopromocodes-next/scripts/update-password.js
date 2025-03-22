const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const newPassword = 'stauss11';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Get the first user or specify by email if you know it
  const user = await prisma.user.findFirst();
  
  if (!user) {
    console.log('No users found in the database');
    return;
  }
  
  // Update the user's password
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });
  
  console.log(`Updated password for user: ${updatedUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 