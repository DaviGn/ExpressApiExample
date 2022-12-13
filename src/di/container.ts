import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IUserRepository, UserRepository } from '@repositories/user';
import {
  ListUsersUseCase,
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '@useCases/user';

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});

// Repositories
container.register<IUserRepository>('UserRepository', UserRepository);

// UseCases
container.register('ListUsersUseCase', ListUsersUseCase);
container.register('GetUserUseCase', GetUserUseCase);
container.register('CreateUserUseCase', CreateUserUseCase);
container.register('UpdateUserUseCase', UpdateUserUseCase);
container.register('DeleteUserUseCase', DeleteUserUseCase);
