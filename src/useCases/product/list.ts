import { inject, injectable } from 'tsyringe';

import { toProductResponse } from '@maps/product';
import { IProductRepository } from '@repositories/product';
import { IPresenter, SuccessPresenter } from '@presenters/index';
import { CacheService, ProductRepository } from '@di/tokens';
import { ICacheService } from '@services/cache';
import { ProductResponse } from '@responses/product';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject(ProductRepository) private repository: IProductRepository,
    @inject(CacheService) private cacheService: ICacheService
  ) {}

  async handle(): Promise<IPresenter> {
    const tokenCache = 'products';
    const cachedProducts = await this.cacheService.get<ProductResponse[]>(
      tokenCache
    );

    if (cachedProducts) {
      console.log(`Products are cached, returning it`);
      return new SuccessPresenter(cachedProducts);
    }

    const products = await this.repository.list();
    const productsResponse = products.map((product) =>
      toProductResponse(product)
    );
    await this.cacheService.set(tokenCache, productsResponse);
    return new SuccessPresenter(productsResponse);
  }
}
