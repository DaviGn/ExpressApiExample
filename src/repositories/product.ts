import { ProductComplete, ProductBrand } from '@domain/types/product';
import { PrismaClient, Product } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IProductRepository {
    list(): Promise<ProductComplete[]>;
    findById(id: string): Promise<Product | null>;
    findByIds(ids: string[]): Promise<ProductBrand[]>;
    findCompleteById(id: string): Promise<ProductComplete | null>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    decreaseQtd(id: string, qtd: number): Promise<void>;
    delete(id: number): Promise<void>;
}

@injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @inject('PrismaClient') private readonly prisma: PrismaClient
    ) {}

    async list(): Promise<ProductComplete[]> {
        return await this.prisma.product.findMany({
            include: {
                brand: true,
                category: true
            },
            orderBy: [
                {
                    description: 'asc'
                }
            ]
        });
    }

    async findById(id: string): Promise<Product | null> {
        return await this.prisma.product.findFirst({
            where: {
                id
            }
        });
    }

    async findByIds(ids: string[]): Promise<ProductBrand[]> {
        return await this.prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: {
                brand: true
            }
        });
    }

    async findCompleteById(id: string): Promise<ProductComplete | null> {
        return await this.prisma.product.findFirst({
            where: {
                id
            },
            include: {
                brand: true,
                category: true
            }
        });
    }

    async create(product: Product): Promise<Product> {
        const createdProduct = await this.prisma.product.create({
            data: product
        });
        return createdProduct;
    }

    async update(product: Product): Promise<Product> {
        const updatedProduct = await this.prisma.product.update({
            data: product,
            where: {
                id: product.id
            }
        });
        return updatedProduct;
    }

    async decreaseQtd(id: string, qtd: number): Promise<void> {
        await this.prisma.product.update({
            data: {
                qtd: {
                    decrement: qtd
                }
            },
            where: {
                id
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.city.delete({
            where: {
                id
            }
        });
    }
}
