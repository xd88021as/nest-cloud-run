import { Prisma, PrismaClient } from '@prisma/client';

export const seedIdentity = async (prisma: PrismaClient) => {
  const args: Prisma.IdentityUpsertArgs[] = seeds.map((seed) => ({
    where: { id: seed.id },
    update: {},
    create: seed,
  }));
  for (const arg of args) {
    await prisma.identity.upsert(arg);
  }
};

const seeds = [
  { id: 1, name: 'staff', isPublic: false},
  { id: 2, name: 'customer', isPublic: true},
  { id: 3, name: 'shopkeeper', isPublic: true},
];
