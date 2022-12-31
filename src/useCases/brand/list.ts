import { inject, injectable } from 'tsyringe';

import { toBrandResponse } from '@maps/brand';
import { IBrandRepository } from '@repositories/brand';
import { IPresenter, SuccessPresenter } from '@presenters/index';

@injectable()
export class ListBrandsUseCase {
    constructor(
        @inject('BrandRepository') private repository: IBrandRepository
    ) {}

    async handle(): Promise<IPresenter> {
        const brands = await this.repository.list();
        const brandsResponse = brands.map((brand) => toBrandResponse(brand));
        return new SuccessPresenter(brandsResponse);
    }
}
