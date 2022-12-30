import { inject, injectable } from 'tsyringe';

import { toProductResponse } from '@maps/product';
import { IProductRepository } from '@repositories/product';
import { IPresenter, SuccessPresenter } from '@presenters/index';
import { CacheService, ProductRepository } from '@di/tokens';
import { ICacheService } from '@services/cache';
import { ProductComplete } from '@domain/types/product';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject(ProductRepository) private repository: IProductRepository,
    @inject(CacheService) private cacheService: ICacheService
  ) {}

  async handle(): Promise<IPresenter> {
    const tokenCache = 'products';
    const cachedProducts = await this.cacheService.get<ProductComplete[]>(
      tokenCache
    );

    if (cachedProducts) {
      console.log(`Products are cached, returning it`);
      const result = this.getResponse(cachedProducts);
      return new SuccessPresenter(result);
    }

    const products = await this.repository.list();
    const productsResponse = this.getResponse(products);
    await this.cacheService.set(tokenCache, productsResponse);
    return new SuccessPresenter(productsResponse);
  }

  private getResponse(products: CacheResponse[]) {
    return products.map((Product) => toProductResponse(Product));
  }
}
