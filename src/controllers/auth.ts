import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@useCases/user';
import { processResult } from '@presenters';
import { AuthRequest } from '@domain/requests/auth';

export async function authenticate(
  req: Request<{}, {}, AuthRequest>,
  res: Response
) {
  const authData = req.body;
  const useCase = container.resolve(AuthenticateUserUseCase);
  const result = await useCase.handle(authData);
  return processResult(res, result);
}
