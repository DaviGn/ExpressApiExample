import { ProductResponse } from '@responses/product';
import { toBrandResponse } from './brand';
import { toCategoryResponse } from './category';
import { ProductComplete } from '@domain/types/product';

export function toProductResponse(product: ProductComplete): ProductResponse {
  return {
    id: product.id,
    description: product.description,
    qtd: product.qtd,
    unitValue: Number(product.unitValue),
    brand: product?.brand && toBrandResponse(product?.brand),
    category: product?.category && toCategoryResponse(product?.category),
  };
}
