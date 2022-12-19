import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  console.log('Running seed...');

  await prisma.city.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Santo André',
      uf: 'SP',
    },
  });
}
