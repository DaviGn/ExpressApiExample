import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserRequest, UpdateUserRequest } from '@request/user';
import {
  ListUsersUseCase,
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '@useCases/user';
import { processResult } from '@presenters';

export async function listUsers(req: Request, res: Response) {
  const useCase = container.resolve(ListUsersUseCase);
  const result = await useCase.handle();
  return processResult(res, result);
}

export async function getUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = container.resolve(GetUserUseCase);
  const result = await useCase.handle(id);
  return processResult(res, result);
}

export async function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) {
  const userData = req.body;
  const useCase = container.resolve(CreateUserUseCase);
  const result = await useCase.handle(userData);
  return processResult(res, result);
}

export async function updateUser(
  req: Request<{ id: string }, {}, UpdateUserRequest>,
  res: Response
) {
  const { id } = req.params;
  const userData = req.body;

  const useCase = container.resolve(UpdateUserUseCase);
  const result = await useCase.handle({
    id,
    ...userData,
  });

  return processResult(res, result);
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  const useCase = container.resolve(DeleteUserUseCase);
  const result = await useCase.handle(id);
  return processResult(res, result);
}
