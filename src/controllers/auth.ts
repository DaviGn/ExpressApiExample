import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { AuthenticateUserUseCase } from '@useCases/user';
import { processResult } from '@presenters/index';
import { AuthRequest } from '@domain/requests/auth';

export async function authenticate(
    req: Request<object, object, AuthRequest>,
    res: Response
) {
    const authData = req.body;
    const useCase = resolve(AuthenticateUserUseCase);
    const result = await useCase.handle(authData);
    return processResult(res, result);
}
