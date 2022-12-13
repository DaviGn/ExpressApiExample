import { City, PrismaClient, User } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

export interface IUserRepository {
  list(): Promise<(User & { city: City })[]>;
  findById(id: string): Promise<(User & { city: City }) | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async list(): Promise<(User & { city: City })[]> {
    return await this.prisma.user.findMany({
      include: {
        city: true,
      },
    });
  }

  async findById(id: string): Promise<(User & { city: City }) | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        city: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: user,
    });
    return createdUser;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      data: user,
      where: {
        id: user.id,
      },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
