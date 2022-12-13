import { City, PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface ICityRepository {
  list(): Promise<City[]>;
  findById(id: number): Promise<City | null>;
  create(city: Omit<City, 'id'>): Promise<City>;
  update(city: City): Promise<City>;
  delete(id: number): Promise<void>;
}

@injectable()
export class CityRepository implements ICityRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async list(): Promise<City[]> {
    return await this.prisma.city.findMany();
  }

  async findById(id: number): Promise<City | null> {
    return await this.prisma.city.findFirst({
      where: {
        id: id,
      },
    });
  }

  async create(city: City): Promise<City> {
    const createdCity = await this.prisma.city.create({
      data: city,
    });
    return createdCity;
  }

  async update(city: City): Promise<City> {
    const updatedCity = await this.prisma.city.update({
      data: city,
      where: {
        id: city.id,
      },
    });
    return updatedCity;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.city.delete({
      where: {
        id: id,
      },
    });
  }
}
