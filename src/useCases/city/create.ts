import { inject, injectable } from 'tsyringe';

import { ICityRepository } from '@repositories/city';
import { IPresenter, SuccessPresenter } from '@presenters';
import { CityDto } from '@domain/dtos/city';

@injectable()
export class CreateCityUseCase {
  constructor(@inject('CityRepository') private repository: ICityRepository) {}

  async handle(user: Omit<CityDto, 'id'>): Promise<IPresenter> {
    const createdCity = await this.repository.create({
      name: user.name,
      uf: user.uf,
    });

    return new SuccessPresenter(createdCity);
  }
}
