import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { CreateUserRequest, UpdateUserRequest } from '@requests/user';
import {
    ListUsersUseCase,
    GetUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
} from '@useCases/user';
import { processResult } from '@presenters/index';

export async function listUsers(req: Request, res: Response) {
    const useCase = resolve(ListUsersUseCase);
    const result = await useCase.handle();
    return processResult(res, result);
}

export async function getUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const useCase = resolve(GetUserUseCase);
    const result = await useCase.handle(id);
    return processResult(res, result);
}

export async function createUser(
    req: Request<object, object, CreateUserRequest>,
    res: Response
) {
    const userData = req.body;
    const useCase = resolve(CreateUserUseCase);
    const result = await useCase.handle(userData);
    return processResult(res, result);
}

export async function updateUser(
    req: Request<{ id: string }, object, UpdateUserRequest>,
    res: Response
) {
    const { id } = req.params;
    const userData = req.body;

    const useCase = resolve(UpdateUserUseCase);
    const result = await useCase.handle({
        id,
        ...userData
    });

    return processResult(res, result);
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const useCase = resolve(DeleteUserUseCase);
    const result = await useCase.handle(id);
    return processResult(res, result);
}
