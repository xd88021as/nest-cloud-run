import { Prisma, PrismaClient } from '@prisma/client';

export const seedRole = async (prisma: PrismaClient) => {
  const args: Prisma.RoleUpsertArgs[] = seeds.map((seed) => ({
    where: { id: seed.id },
    update: {},
    create: seed,
  }));
  for (const arg of args) {
    await prisma.role.upsert(arg);
  }
};

const seeds = [
  { id: 1, name: 'staff', isPublic: false},
  { id: 2, name: 'customer', isPublic: true},
  { id: 3, name: 'shopkeeper', isPublic: true},
];
