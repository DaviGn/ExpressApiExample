import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import { CreateBrandRequest, UpdateBrandRequest } from '@requests/brand';
import {
    CreateBrandUseCase,
    DeleteBrandUseCase,
    GetBrandUseCase,
    ListBrandsUseCase,
    UpdateBrandUseCase
} from '@useCases/brand';
import { processResult } from '@presenters/index';

export async function listBrands(req: Request, res: Response) {
    const useCase = resolve(ListBrandsUseCase);
    const result = await useCase.handle();
    return processResult(res, result);
}

export async function getBrand(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const useCase = resolve(GetBrandUseCase);
    const result = await useCase.handle(Number(id));
    return processResult(res, result);
}

export async function createBrand(
    req: Request<object, object, CreateBrandRequest>,
    res: Response
) {
    const cityData = req.body;
    const useCase = resolve(CreateBrandUseCase);
    const result = await useCase.handle(cityData);
    return processResult(res, result);
}

export async function updateBrand(
    req: Request<{ id: string }, object, Omit<UpdateBrandRequest, 'id'>>,
    res: Response
) {
    const { id } = req.params;
    const cityData = req.body;

    const useCase = resolve(UpdateBrandUseCase);
    const result = await useCase.handle({
        id: Number(id),
        ...cityData
    });

    return processResult(res, result);
}

export async function deleteBrand(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const useCase = resolve(DeleteBrandUseCase);
    const result = await useCase.handle(Number(id));
    return processResult(res, result);
}
