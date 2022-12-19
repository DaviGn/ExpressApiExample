import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { CreateCityRequest, UpdateCityRequest } from '@request/city';
import {
  ListCitiesUseCase,
  GetCityUseCase,
  CreateCityUseCase,
  UpdateCityUseCase,
  DeleteCityUseCase,
} from '@useCases/city';
import { processResult } from '@presenters/index';

export async function listCities(req: Request, res: Response) {
  const useCase = resolve(ListCitiesUseCase);
  const result = await useCase.handle();
  return processResult(res, result);
}

export async function getCity(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = resolve(GetCityUseCase);
  const result = await useCase.handle(Number(id));
  return processResult(res, result);
}

export async function createCity(
  req: Request<{}, {}, CreateCityRequest>,
  res: Response
) {
  const cityData = req.body;
  const useCase = resolve(CreateCityUseCase);
  const result = await useCase.handle(cityData);
  return processResult(res, result);
}

export async function updateCity(
  req: Request<{ id: string }, {}, UpdateCityRequest>,
  res: Response
) {
  const { id } = req.params;
  const cityData = req.body;

  const useCase = resolve(UpdateCityUseCase);
  const result = await useCase.handle({
    id: Number(id),
    ...cityData,
  });

  return processResult(res, result);
}

export async function deleteCity(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = resolve(DeleteCityUseCase);
  const result = await useCase.handle(Number(id));
  return processResult(res, result);
}
