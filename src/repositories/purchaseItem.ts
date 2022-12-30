import { PrismaClient, PurchaseItem } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IPurchaseItemRepository {
  // list(): Promise<ProductComplete[]>;
  // findById(id: string): Promise<ProductComplete | null>;
  create(purchase: Omit<PurchaseItem, 'id'>): Promise<PurchaseItem>;
  // update(product: Product): Promise<Product>;
  // delete(id: number): Promise<void>;
}

@injectable()
export class PurchaseItemRepository implements IPurchaseItemRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  // async list(): Promise<ProductComplete[]> {
  //   return await this.prisma.product.findMany({
  //     include: {
  //       brand: true,
  //       category: true,
  //     },
  //     orderBy: [
  //       {
  //         description: 'asc',
  //       },
  //     ],
  //   });
  // }

  // async findById(id: string): Promise<ProductComplete | null> {
  //   return await this.prisma.product.findFirst({
  //     where: {
  //       id: id,
  //     },
  //     include: {
  //       brand: true,
  //       category: true,
  //     },
  //   });
  // }

  async create(item: Omit<PurchaseItem, 'id'>): Promise<PurchaseItem> {
    const createdItem = await this.prisma.purchaseItem.create({
      data: item,
    });
    return createdItem;
  }

  // async update(product: Product): Promise<Product> {
  //   const updatedProduct = await this.prisma.product.update({
  //     data: product,
  //     where: {
  //       id: product.id,
  //     },
  //   });
  //   return updatedProduct;
  // }

  // async delete(id: number): Promise<void> {
  //   await this.prisma.city.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
