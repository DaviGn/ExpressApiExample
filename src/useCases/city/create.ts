import { inject, injectable } from 'tsyringe';

import { ICityRepository } from '@repositories/city';
import { IPresenter, CreatedPresenter } from '@presenters/index';
import { CreateCityRequest } from '@requests/city';

@injectable()
export class CreateCityUseCase {
    constructor(
        @inject('CityRepository') private repository: ICityRepository
    ) {}

    async handle(user: CreateCityRequest): Promise<IPresenter> {
        const createdCity = await this.repository.create({
            name: user.name,
            uf: user.uf
        });

        return new CreatedPresenter(createdCity);
    }
}
