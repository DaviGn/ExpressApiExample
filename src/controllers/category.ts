import { Request, Response } from 'express';
import { resolve } from '@di/handler';
import {
    CreateCategoryRequest,
    UpdateCategoryRequest
} from '@requests/category';
import {
    ListCategoriesUseCase,
    GetCategoryUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase
} from '@useCases/category';
import { processResult } from '@presenters/index';

export async function listCategories(req: Request, res: Response) {
    const useCase = resolve(ListCategoriesUseCase);
    const result = await useCase.handle();
    return processResult(res, result);
}

export async function getCategory(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const useCase = resolve(GetCategoryUseCase);
    const result = await useCase.handle(Number(id));
    return processResult(res, result);
}

export async function createCategory(
    req: Request<{}, {}, CreateCategoryRequest>,
    res: Response
) {
    const categoryData = req.body;
    const useCase = resolve(CreateCategoryUseCase);
    const result = await useCase.handle(categoryData);
    return processResult(res, result);
}

export async function updateCategory(
    req: Request<{ id: string }, {}, Omit<UpdateCategoryRequest, 'id'>>,
    res: Response
) {
    const { id } = req.params;
    const categoryData = req.body;

    const useCase = resolve(UpdateCategoryUseCase);
    const result = await useCase.handle({
        id: Number(id),
        ...categoryData
    });

    return processResult(res, result);
}

export async function deleteCategory(
    req: Request<{ id: string }>,
    res: Response
) {
    const { id } = req.params;
    const useCase = resolve(DeleteCategoryUseCase);
    const result = await useCase.handle(Number(id));
    return processResult(res, result);
}
