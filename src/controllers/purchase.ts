import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { processResult } from '@presenters/index';
import { PurchaseRequest } from '@requests/purchase';
import {
    CreatePurchaseUseCase,
    ListPurchasesUseCase
} from '@useCases/purchase';

export async function listPurchases(req: Request, res: Response) {
    const useCase = resolve(ListPurchasesUseCase);
    const result = await useCase.handle(req.user.id);
    return processResult(res, result);
}

export async function createPurchase(
    req: Request<{}, {}, Omit<PurchaseRequest, 'userId'>>,
    res: Response
) {
    const useCase = resolve(CreatePurchaseUseCase);
    const result = await useCase.handle({
        userId: req.user.id,
        ...req.body
    });
    return processResult(res, result);
}
