import { PrismaClient } from '@prisma/client';

export async function seedCities(prisma: PrismaClient): Promise<void> {
  console.log('Seeding cities...');

  await prisma.city.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Santo André',
      uf: 'SP',
    },
  });
}
