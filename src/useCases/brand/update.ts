import { inject, injectable } from 'tsyringe';

import { UpdateBrandRequest } from '@requests/brand';
import { IBrandRepository } from '@repositories/brand';
import {
    IPresenter,
    NotFoundPresenter,
    SuccessPresenter
} from '@presenters/index';
import { toBrandResponse } from '@maps/brand';

@injectable()
export class UpdateBrandUseCase {
    constructor(
        @inject('BrandRepository') private repository: IBrandRepository
    ) {}

    async handle(brand: UpdateBrandRequest): Promise<IPresenter> {
        const brandExist = await this.checkIfBrandExists(brand.id);

        if (!brandExist) {
            return new NotFoundPresenter({ message: 'Brand not found!' });
        }

        const updatedBrand = await this.repository.update(brand);
        const result = toBrandResponse(updatedBrand);
        return new SuccessPresenter(result);
    }

    private async checkIfBrandExists(id: number): Promise<boolean> {
        const existingBrand = await this.repository.findById(id);
        const brandExist = !!existingBrand;
        return brandExist;
    }
}
