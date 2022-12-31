import { Brand, PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IBrandRepository {
    list(): Promise<Brand[]>;
    findById(id: number): Promise<Brand | null>;
    create(brand: Omit<Brand, 'id'>): Promise<Brand>;
    update(brand: Brand): Promise<Brand>;
    delete(id: number): Promise<void>;
}

@injectable()
export class BrandRepository implements IBrandRepository {
    constructor(
        @inject('PrismaClient') private readonly prisma: PrismaClient
    ) {}

    async list(): Promise<Brand[]> {
        return await this.prisma.brand.findMany({
            orderBy: [
                {
                    name: 'asc'
                }
            ]
        });
    }

    async findById(id: number): Promise<Brand | null> {
        return await this.prisma.brand.findFirst({
            where: {
                id: id
            }
        });
    }

    async create(brand: Brand): Promise<Brand> {
        const createdBrand = await this.prisma.brand.create({
            data: brand
        });
        return createdBrand;
    }

    async update(brand: Brand): Promise<Brand> {
        const updatedBrand = await this.prisma.brand.update({
            data: brand,
            where: {
                id: brand.id
            }
        });
        return updatedBrand;
    }

    async delete(id: number): Promise<void> {
        await this.prisma.city.delete({
            where: {
                id: id
            }
        });
    }
}
