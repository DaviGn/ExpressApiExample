import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const runMigration = process.env.SERVER_RUN_SEED
  ? !!process.env.SERVER_RUN_SEED
  : false;

export async function seed() {
  if (!runMigration) return;

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
