import { inject, injectable } from 'tsyringe';

import { CreateCategoryRequest } from '@requests/category';
import { ICategoryRepository } from '@repositories/category';
import { IPresenter, SuccessPresenter } from '@presenters/index';
import { toCategoryResponse } from '@maps/category';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository') private repository: ICategoryRepository
  ) {}

  async handle({ name }: CreateCategoryRequest): Promise<IPresenter> {
    const createdCategory = await this.repository.create({
      name,
    });

    const result = toCategoryResponse(createdCategory);
    return new SuccessPresenter(result);
  }
}
