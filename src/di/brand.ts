import { container } from 'tsyringe';

import { IBrandRepository, BrandRepository } from '@repositories/brand';
import {
  ListBrandsUseCase,
  GetBrandUseCase,
  CreateBrandUseCase,
  UpdateBrandUseCase,
  DeleteBrandUseCase,
} from '@useCases/brand';

// Repositories
container.register<IBrandRepository>('BrandRepository', BrandRepository);

// UseCases
container.register('ListBrandsUseCase', ListBrandsUseCase);
container.register('GetBrandUseCase', GetBrandUseCase);
container.register('CreateBrandUseCase', CreateBrandUseCase);
container.register('UpdateBrandUseCase', UpdateBrandUseCase);
container.register('DeleteBrandUseCase', DeleteBrandUseCase);
