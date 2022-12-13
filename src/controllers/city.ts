import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CityDto } from '@domain/dtos/city';
import {
  ListCitiesUseCase,
  GetCityUseCase,
  CreateCityUseCase,
  UpdateCityUseCase,
  DeleteCityUseCase,
} from '@useCases/city';
import { processResult } from '@presenters';

export async function listCities(req: Request, res: Response) {
  const useCase = container.resolve(ListCitiesUseCase);
  const result = await useCase.handle();
  return processResult(res, result);
}

export async function getCity(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = container.resolve(GetCityUseCase);
  const result = await useCase.handle(Number(id));
  return processResult(res, result);
}

export async function createCity(req: Request<{}, {}, CityDto>, res: Response) {
  const cityData = req.body;
  const useCase = container.resolve(CreateCityUseCase);
  const result = await useCase.handle(cityData);
  return processResult(res, result);
}

export async function updateCity(
  req: Request<{ id: string }, {}, Omit<CityDto, 'id'>>,
  res: Response
) {
  const { id } = req.params;
  const cityData = req.body;

  const useCase = container.resolve(UpdateCityUseCase);
  const result = await useCase.handle({
    id: Number(id),
    ...cityData,
  });

  return processResult(res, result);
}

export async function deleteCity(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = container.resolve(DeleteCityUseCase);
  const result = await useCase.handle(Number(id));
  return processResult(res, result);
}
