import { inject, injectable } from 'tsyringe';

import { ICityRepository } from '@repositories/city';
import {
    IPresenter,
    NotFoundPresenter,
    SuccessPresenter
} from '@presenters/index';
import { toCityResponse } from '@maps/city';

@injectable()
export class GetCityUseCase {
    constructor(
        @inject('CityRepository') private repository: ICityRepository
    ) {}

    async handle(id: number): Promise<IPresenter> {
        const city = await this.repository.findById(id);

        if (!city) {
            return new NotFoundPresenter({ message: 'City not found!' });
        }

        const result = toCityResponse(city);
        return new SuccessPresenter(result);
    }
}
