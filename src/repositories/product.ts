import { Product, PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IProductRepository {
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async list(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: product,
    });
    return createdProduct;
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      data: product,
      where: {
        id: product.id,
      },
    });
    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.city.delete({
      where: {
        id: id,
      },
    });
  }
}
