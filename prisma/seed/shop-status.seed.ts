import { Prisma, PrismaClient } from '@prisma/client';

export const seedShopStatus = async (prisma: PrismaClient) => {
  const args: Prisma.ShopStatusUpsertArgs[] = seeds.map((seed) => ({
    where: { id: seed.id },
    update: {},
    create: seed,
  }));
  for (const arg of args) {
    await prisma.shopStatus.upsert(arg);
  }
};

const seeds = [
  { id: 1, name: 'pending' },
  { id: 2, name: 'opening' },
  { id: 3, name: 'close' },
];
