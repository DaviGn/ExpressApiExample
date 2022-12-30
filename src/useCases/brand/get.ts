import { inject, injectable } from 'tsyringe';
import { toBrandResponse } from '@maps/brand';
import { IBrandRepository } from '@repositories/brand';
import {
  IPresenter,
  NotFoundPresenter,
  SuccessPresenter,
} from '@presenters/index';

@injectable()
export class GetBrandUseCase {
  constructor(
    @inject('BrandRepository') private repository: IBrandRepository
  ) {}

  async handle(id: number): Promise<IPresenter> {
    console.log(`Getting brand ${id} from database`);
    const brand = await this.repository.findById(id);

    if (!brand) {
      return new NotFoundPresenter({ message: 'Brand not found!' });
    }

    const result = toBrandResponse(brand);
    return new SuccessPresenter(result);
  }
}
