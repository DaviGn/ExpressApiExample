import { inject, injectable } from 'tsyringe';

import { UpdateCategoryRequest } from '@requests/category';
import { ICategoryRepository } from '@repositories/category';
import {
    IPresenter,
    NotFoundPresenter,
    SuccessPresenter
} from '@presenters/index';
import { toCategoryResponse } from '@maps/category';

@injectable()
export class UpdateCategoryUseCase {
    constructor(
        @inject('CategoryRepository') private repository: ICategoryRepository
    ) {}

    async handle(category: UpdateCategoryRequest): Promise<IPresenter> {
        const categoryExist = await this.checkIfCategoryExists(category.id);

        if (!categoryExist) {
            return new NotFoundPresenter({ message: 'Category not found!' });
        }

        const updatedCategory = await this.repository.update(category);
        const result = toCategoryResponse(updatedCategory);
        return new SuccessPresenter(result);
    }

    private async checkIfCategoryExists(id: number): Promise<boolean> {
        const existingCategory = await this.repository.findById(id);
        const categoryExist = !!existingCategory;
        return categoryExist;
    }
}
