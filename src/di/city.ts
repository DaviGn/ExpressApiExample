import { container } from 'tsyringe';

import { ICityRepository, CityRepository } from '@repositories/city';
import {
  ListCitiesUseCase,
  GetCityUseCase,
  CreateCityUseCase,
  UpdateCityUseCase,
  DeleteCityUseCase,
} from '@useCases/city';

// Repositories
container.register<ICityRepository>('CityRepository', CityRepository);

// UseCases
container.register('ListCitiesUseCase', ListCitiesUseCase);
container.register('GetCityUseCase', GetCityUseCase);
container.register('CreateCityUseCase', CreateCityUseCase);
container.register('UpdateCityUseCase', UpdateCityUseCase);
container.register('DeleteCityUseCase', DeleteCityUseCase);
