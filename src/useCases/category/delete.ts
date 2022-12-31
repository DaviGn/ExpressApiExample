import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@repositories/category';
import {
    IPresenter,
    NotFoundPresenter,
    DeletedPresenter
} from '@presenters/index';

@injectable()
export class DeleteCategoryUseCase {
    constructor(
        @inject('CategoryRepository') private repository: ICategoryRepository
    ) {}

    async handle(id: number): Promise<IPresenter> {
        const brandExist = await this.checkIfCategoryExists(id);

        if (!brandExist) {
            return new NotFoundPresenter({ message: 'Category not found!' });
        }

        await this.repository.delete(id);
        return new DeletedPresenter();
    }

    private async checkIfCategoryExists(id: number): Promise<boolean> {
        const existingCategory = await this.repository.findById(id);
        const brandExist = !!existingCategory;
        return brandExist;
    }
}
