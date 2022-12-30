import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';

import { IPurchaseRepository } from '@repositories/purchase';
import { IPurchaseItemRepository } from '@repositories/purchaseItem';
import { IPresenter, SuccessPresenter } from '@presenters/index';
import { PurchaseItemRequest, PurchaseRequest } from '@requests/purchase';
import { IProductRepository } from '@repositories/product';
import { CreatePurchaseResponse } from '@responses/purchase';
import { BrandResponse } from '@domain/responses/brand';
import { toBrandResponse } from '@maps/brand';
import { ProductBrand } from '@domain/types/product';

type ProductData = {
  id: string;
  description: string;
  brand?: BrandResponse;
  qtd: number;
  unitValue: number;
  total: number;
};

@injectable()
export class CreatePurchaseUseCase {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,
    @inject('PurchaseItemRepository')
    private purchaseItemRepository: IPurchaseItemRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async handle(purchase: PurchaseRequest): Promise<IPresenter> {
    const purchaseId = v4();
    const currentDateTime = new Date();
    console.log(`Processing purchase ${purchaseId}`);

    const productsIds = purchase.items.map((x) => x.productId);
    const products = await this.productRepository.findByIds(productsIds);

    const productsData = this.processProductData(purchase.items, products);

    const totalValue = await this.calculateTotalValue(productsData);

    await this.savePurchase(
      purchaseId,
      purchase.userId,
      totalValue,
      currentDateTime,
      productsData
    );

    await this.removeProductFromStock(productsData);

    var formattedDate = format(currentDateTime, 'dd/MM/yyyy HH:mm:ss');
    const response = this.processResponse(
      purchaseId,
      totalValue,
      formattedDate,
      productsData
    );
    return new SuccessPresenter(response);
  }

  async savePurchase(
    purchaseId: string,
    userId: string,
    totalValue: number,
    date: Date,
    products: ProductData[]
  ): Promise<void> {
    await this.purchaseRepository.create({
      id: purchaseId,
      date: date,
      userId: userId,
      totalValue: new Prisma.Decimal(totalValue),
    });

    for (let i = 0; i < products.length; i++) {
      await this.purchaseItemRepository.create({
        purchaseId: purchaseId,
        productId: products[i].id,
        qtd: products[i].qtd,
        unitValue: new Prisma.Decimal(products[i].unitValue),
      });
    }
  }

  async removeProductFromStock(items: ProductData[]) {
    for (let i = 0; i < items.length; i++) {
      await this.productRepository.decreaseQtd(items[i].id, items[i].qtd);
    }
  }

  async calculateTotalValue(products: ProductData[]): Promise<number> {
    const productsTotalValues = products.map((x) => x.total);
    const totalValue = productsTotalValues.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    return totalValue;
  }

  processProductData(
    items: PurchaseItemRequest[],
    products: ProductBrand[]
  ): ProductData[] {
    return items.map((x) => {
      const product = products.find((y) => y.id == x.productId);

      return {
        id: x.productId,
        description: product?.description || '',
        brand: product?.brand && toBrandResponse(product.brand),
        qtd: x.qtd,
        unitValue: Number(product?.unitValue || 0),
        total: x.qtd * Number(product?.unitValue || 0),
      };
    });
  }

  processResponse(
    purchaseId: string,
    totalValue: number,
    date: string,
    products: ProductData[]
  ): CreatePurchaseResponse {
    const response = {
      id: purchaseId,
      totalValue,
      date,
      items: products.map((x) => {
        return {
          description: x.description,
          brand: x.brand?.name,
          productId: x.id,
          qtd: x.qtd,
          unitValue: x.unitValue,
          total: x.total,
        };
      }),
    };
    return response;
  }
}
