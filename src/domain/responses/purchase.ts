import { ProductResponse } from './product';
interface CreatePurchaseItemResponse {
  productId: string;
  description: string;
  brand: string;
  qtd: number;
  unitValue: number;
  total: number;
}

interface BasePurchaseResponse {
  id: string;
  totalValue: number;
  date: string;
}

export interface CreatePurchaseResponse extends BasePurchaseResponse {
  items: CreatePurchaseItemResponse[];
}

export interface ListPurchaseItemsResponse {
  product: ProductResponse;
  qtd: number;
  unitValue: number;
  total: number;
}

export interface ListPurchaseResponse extends BasePurchaseResponse {
  items: ListPurchaseItemsResponse[];
}
