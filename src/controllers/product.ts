import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { GetProductUseCase, ListProductsUseCase } from '@useCases/product';
import { processResult } from '@presenters/index';

export async function listProducts(req: Request, res: Response) {
    const useCase = resolve(ListProductsUseCase);
    const result = await useCase.handle();
    return processResult(res, result);
}

export async function getProduct(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const useCase = resolve(GetProductUseCase);
    const result = await useCase.handle(id);
    return processResult(res, result);
}
