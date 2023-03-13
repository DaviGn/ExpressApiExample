import { PrismaClient } from '@prisma/client';
import { seedBrands, seedCategories, seedCities } from './seeds';
import { seedProducts } from './seeds/product';

const prisma = new PrismaClient();

const runSeed =
    process.env.SERVER_RUN_SEED !== undefined
        ? process.env.SERVER_RUN_SEED === 'true'
        : false;

export async function seed() {
    if (!runSeed) return;

    console.log('Running seed...');

    await seedCities(prisma);
    await seedBrands(prisma);
    await seedCategories(prisma);
    await seedProducts(prisma);
}
