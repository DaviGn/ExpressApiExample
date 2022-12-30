import { PrismaClient } from '@prisma/client';

export async function seedBrands(prisma: PrismaClient): Promise<void> {
  console.log('Seeding brands...');

  await prisma.brand.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Nike',
    },
  });

  await prisma.brand.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Adidas',
    },
  });

  await prisma.brand.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Vans',
    },
  });

  await prisma.brand.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'New Balance',
    },
  });
}
