import { Product, Brand, Category } from '@prisma/client';

export type ProductBrand = Product & { brand: Brand };
export type ProductComplete = Product & { brand: Brand; category: Category };
