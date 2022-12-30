import { PrismaClient } from '@prisma/client';
import { seedBrands, seedCategories, seedCities } from './seeds';

const prisma = new PrismaClient();

const runSeed = process.env.SERVER_RUN_SEED
  ? !!process.env.SERVER_RUN_SEED
  : false;

export async function seed() {
  if (!runSeed) return;

  console.log('Running seed...');

  await seedCities(prisma);
  await seedBrands(prisma);
  await seedCategories(prisma);
}
