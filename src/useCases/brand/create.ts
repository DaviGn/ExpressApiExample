import { inject, injectable } from 'tsyringe';

import { CreateBrandRequest } from '@requests/brand';
import { IBrandRepository } from '@repositories/brand';
import { CreatedPresenter, IPresenter } from '@presenters/index';
import { toBrandResponse } from '@maps/brand';

@injectable()
export class CreateBrandUseCase {
    constructor(
        @inject('BrandRepository') private repository: IBrandRepository
    ) {}

    async handle({ name }: CreateBrandRequest): Promise<IPresenter> {
        const createdBrand = await this.repository.create({
            name
        });

        const result = toBrandResponse(createdBrand);
        return new CreatedPresenter(result);
    }
}
