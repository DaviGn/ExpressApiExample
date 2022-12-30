import { inject, injectable } from 'tsyringe';

import { IPresenter, SuccessPresenter } from '@presenters/index';
import { IPurchaseRepository } from '@repositories/purchase';
import { toPurchaseResponse } from '@maps/purchase';
import { ICacheService } from '@services/cache';
import { CacheService } from '@di/tokens';
import { ListPurchaseResponse } from '@responses/purchase';

@injectable()
export class ListPurchasesUseCase {
  constructor(
    @inject('PurchaseRepository') private repository: IPurchaseRepository,
    @inject(CacheService) private cacheService: ICacheService
  ) {}

  async handle(userId: string): Promise<IPresenter> {
    const cachedPurchasesKey = `purchases-${userId}`;
    const cachedPurchases = await this.cacheService.get<ListPurchaseResponse[]>(
      cachedPurchasesKey
    );

    if (cachedPurchases) {
      console.log(`User ${userId} purchases is cached, returning it`);
      return new SuccessPresenter(cachedPurchases);
    }

    const purchases = await this.repository.listComplete(userId);
    const purchasesResponse = purchases.map((purchase) =>
      toPurchaseResponse(purchase)
    );
    await this.cacheService.set(cachedPurchasesKey, purchasesResponse);
    return new SuccessPresenter(purchasesResponse);
  }
}
