import { inject, injectable } from 'tsyringe';

import { IBrandRepository } from '@repositories/brand';
import {
  IPresenter,
  NotFoundPresenter,
  DeletedPresenter,
} from '@presenters/index';

@injectable()
export class DeleteBrandUseCase {
  constructor(
    @inject('BrandRepository') private repository: IBrandRepository
  ) {}

  async handle(id: number): Promise<IPresenter> {
    const brandExist = await this.checkIfBrandExists(id);

    if (!brandExist) {
      return new NotFoundPresenter({ message: 'Brand not found!' });
    }

    await this.repository.delete(id);
    return new DeletedPresenter();
  }

  private async checkIfBrandExists(id: number): Promise<boolean> {
    const existingBrand = await this.repository.findById(id);
    const brandExist = !!existingBrand;
    return brandExist;
  }
}
