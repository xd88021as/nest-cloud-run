import { PrismaClient } from '@prisma/client';
import { seedGender } from './seed/gender.seed';
const prisma = new PrismaClient();

async function main() {
  await seedGender(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
