import { inject, injectable } from 'tsyringe';
import { toProductResponse } from '@maps/product';
import { IProductRepository, ProductRepository } from '@repositories/product';
import {
    IPresenter,
    NotFoundPresenter,
    SuccessPresenter
} from '@presenters/index';
import { ICacheService } from '@services/cache';
import { CacheService } from '@di/tokens';
import { ProductComplete } from '@domain/types/product';

@injectable()
export class GetProductUseCase {
    constructor(
        @inject(ProductRepository) private repository: IProductRepository,
        @inject(CacheService) private cacheService: ICacheService
    ) {}

    async handle(id: string): Promise<IPresenter> {
        const cachedProductKey = `product-${id}`;
        const cachedProduct = await this.cacheService.get<ProductComplete>(
            cachedProductKey
        );

        if (cachedProduct) {
            console.log(`Product ${id} is cached, returning it`);
            const result = toProductResponse(cachedProduct);
            return new SuccessPresenter(result);
        }

        console.log(`Getting Product ${id} from database`);
        const product = await this.repository.findCompleteById(id);

        if (!product) {
            return new NotFoundPresenter({ message: 'Product not found!' });
        }

        const result = toProductResponse(product);
        await this.cacheService.set(cachedProductKey, result);
        return new SuccessPresenter(result);
    }
}
