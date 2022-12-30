import { Category } from '@prisma/client';
import { CategoryResponse } from '@responses/category';

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
  };
}
