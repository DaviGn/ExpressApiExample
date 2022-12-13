import { inject, injectable } from 'tsyringe';

import { ICityRepository } from '@repositories/city';
import { IPresenter } from 'presenters/IPresenter';
import { SuccessPresenter } from '@presenters';
import { toCityResponse } from '@maps/city';

@injectable()
export class ListCitiesUseCase {
  constructor(@inject('CityRepository') private repository: ICityRepository) {}

  async handle(): Promise<IPresenter> {
    const cities = await this.repository.list();
    const citiesResponse = cities.map((city) => toCityResponse(city));
    return new SuccessPresenter(citiesResponse);
  }
}
