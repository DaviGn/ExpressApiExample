import { container } from 'tsyringe';

import { IUserRepository, UserRepository } from '@repositories/user';
import {
    ListUsersUseCase,
    GetUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AuthenticateUserUseCase
} from '@useCases/user';

// Repositories
container.register<IUserRepository>('UserRepository', UserRepository);

// UseCases
container.register('ListUsersUseCase', ListUsersUseCase);
container.register('GetUserUseCase', GetUserUseCase);
container.register('CreateUserUseCase', CreateUserUseCase);
container.register('UpdateUserUseCase', UpdateUserUseCase);
container.register('DeleteUserUseCase', DeleteUserUseCase);
container.register('AuthenticateUserUseCase', AuthenticateUserUseCase);
