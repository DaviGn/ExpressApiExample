import { PurchaseComplete } from '@domain/types/purchase';
import { PrismaClient, Purchase } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IPurchaseRepository {
    listComplete(userId: string): Promise<PurchaseComplete[]>;
    // findById(id: string): Promise<ProductComplete | null>;
    create(purchase: Purchase): Promise<Purchase>;
}

@injectable()
export class PurchaseRepository implements IPurchaseRepository {
    constructor(
        @inject('PrismaClient') private readonly prisma: PrismaClient
    ) {}

    async listComplete(userId: string): Promise<PurchaseComplete[]> {
        return await this.prisma.purchase.findMany({
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                brand: true,
                                category: true
                            }
                        }
                    }
                }
            }
        });
    }

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

    async create(purchase: Purchase): Promise<Purchase> {
        const createdPurchase = await this.prisma.purchase.create({
            data: purchase
        });
        return createdPurchase;
    }
}
