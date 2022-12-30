import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient): Promise<void> {
  console.log('Seeding products...');

  await prisma.product.upsert({
    where: { id: 'dde8db23-ecb8-4c7c-aa85-747aa856bf18' },
    update: {},
    create: {
      id: 'dde8db23-ecb8-4c7c-aa85-747aa856bf18',
      description: 'Air Force 1 All White',
      qtd: 100,
      unitValue: 899.9,
      brandId: 1,
      categoryId: 1,
    },
  });
  await prisma.product.upsert({
    where: { id: '0677fcc0-5b4d-4a60-a628-aca7f7603283' },
    update: {},
    create: {
      id: '0677fcc0-5b4d-4a60-a628-aca7f7603283',
      description: 'Air Jordan 1',
      qtd: 50,
      unitValue: 1099.9,
      brandId: 1,
      categoryId: 1,
    },
  });
  await prisma.product.upsert({
    where: { id: '7cf58f39-1595-487e-854a-b4a7c2331c78' },
    update: {},
    create: {
      id: '7cf58f39-1595-487e-854a-b4a7c2331c78',
      description: 'Breaknet',
      qtd: 35,
      unitValue: 299.9,
      brandId: 2,
      categoryId: 1,
    },
  });
  await prisma.product.upsert({
    where: { id: '8b1688c9-d1c7-44bc-a683-53b52e5b6f3e' },
    update: {},
    create: {
      id: '8b1688c9-d1c7-44bc-a683-53b52e5b6f3e',
      description: 'Ultrarange',
      qtd: 60,
      unitValue: 549.9,
      brandId: 3,
      categoryId: 1,
    },
  });
  await prisma.product.upsert({
    where: { id: '2d5df82a-3226-49c9-8123-35863eef10fc' },
    update: {},
    create: {
      id: '2d5df82a-3226-49c9-8123-35863eef10fc',
      description: '574',
      qtd: 15,
      unitValue: 479.9,
      brandId: 4,
      categoryId: 1,
    },
  });
}
