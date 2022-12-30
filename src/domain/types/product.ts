import { Product, PrismaClient, Brand, Category } from '@prisma/client';

export type ProductComplete = Product & { brand: Brand; category: Category };
