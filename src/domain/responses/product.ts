import { BrandResponse } from './brand';
import { CategoryResponse } from './category';

export interface ProductResponse {
  id: string;
  description: string;
  unitValue: number;
  qtd: number;
  brand?: BrandResponse;
  category?: CategoryResponse;
}
