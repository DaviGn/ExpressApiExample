import { inject, injectable } from 'tsyringe';
import { toCategoryResponse } from '@maps/category';
import { ICategoryRepository } from '@repositories/category';
import {
    IPresenter,
    NotFoundPresenter,
    SuccessPresenter
} from '@presenters/index';

@injectable()
export class GetCategoryUseCase {
    constructor(
        @inject('CategoryRepository') private repository: ICategoryRepository
    ) {}

    async handle(id: number): Promise<IPresenter> {
        console.log(`Getting category ${id} from database`);
        const category = await this.repository.findById(id);

        if (!category) {
            return new NotFoundPresenter({ message: 'Category not found!' });
        }

        const result = toCategoryResponse(category);
        return new SuccessPresenter(result);
    }
}
