import { inject, injectable } from 'tsyringe';

import { toCategoryResponse } from '@maps/category';
import { ICategoryRepository } from '@repositories/category';
import { IPresenter, SuccessPresenter } from '@presenters/index';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoryRepository') private repository: ICategoryRepository
  ) {}

  async handle(): Promise<IPresenter> {
    const categorys = await this.repository.list();
    const categorysResponse = categorys.map((category) =>
      toCategoryResponse(category)
    );
    return new SuccessPresenter(categorysResponse);
  }
}
