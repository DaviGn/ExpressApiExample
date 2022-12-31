import { container } from 'tsyringe';

import {
    ICategoryRepository,
    CategoryRepository
} from '@repositories/category';
import {
    ListCategoriesUseCase,
    GetCategoryUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase
} from '@useCases/category';

// Repositories
container.register<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
);

// UseCases
container.register('ListCategoriesUseCase', ListCategoriesUseCase);
container.register('GetCategoryUseCase', GetCategoryUseCase);
container.register('CreateCategoryUseCase', CreateCategoryUseCase);
container.register('UpdateCategoryUseCase', UpdateCategoryUseCase);
container.register('DeleteCategoryUseCase', DeleteCategoryUseCase);
