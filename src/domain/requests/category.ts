interface BaseCategoryRequest {
  name: string;
}

export interface CreateCategoryRequest extends BaseCategoryRequest {}

export interface UpdateCategoryRequest extends BaseCategoryRequest {
  id: number;
}
