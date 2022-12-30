import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient): Promise<void> {
  console.log('Seeding categories...');

  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Sneaker',
    },
  });
}
