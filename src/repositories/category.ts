import { Category, PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface ICategoryRepository {
    list(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    create(category: Omit<Category, 'id'>): Promise<Category>;
    update(category: Category): Promise<Category>;
    delete(id: number): Promise<void>;
}

@injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @inject('PrismaClient') private readonly prisma: PrismaClient
    ) {}

    async list(): Promise<Category[]> {
        return await this.prisma.category.findMany({
            orderBy: [
                {
                    name: 'asc'
                }
            ]
        });
    }

    async findById(id: number): Promise<Category | null> {
        return await this.prisma.category.findFirst({
            where: {
                id: id
            }
        });
    }

    async create(category: Category): Promise<Category> {
        const createdBrand = await this.prisma.category.create({
            data: category
        });
        return createdBrand;
    }

    async update(category: Category): Promise<Category> {
        const updatedBrand = await this.prisma.category.update({
            data: category,
            where: {
                id: category.id
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
