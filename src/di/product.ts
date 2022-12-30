import { container } from 'tsyringe';

import { IProductRepository, ProductRepository } from '@repositories/product';
import { GetProductUseCase, ListProductsUseCase } from '@useCases/product';

// Repositories
container.register<IProductRepository>('ProductRepository', ProductRepository);

// UseCases
container.register('ListProductsUseCase', GetProductUseCase);
container.register('GetProductUseCase', ListProductsUseCase);
