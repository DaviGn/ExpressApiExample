import { container } from 'tsyringe';

import {
  IPurchaseRepository,
  PurchaseRepository,
} from '@repositories/purchase';
import { CreatePurchaseUseCase } from '@useCases/purchase';
import { ListProductsUseCase } from '../useCases/product/list';

// Repositories
container.register<IPurchaseRepository>(
  'PurchaseRepository',
  PurchaseRepository
);

// UseCases
container.register('CreatePurchaseUseCase', CreatePurchaseUseCase);
container.register('ListProductsUseCase', ListProductsUseCase);
