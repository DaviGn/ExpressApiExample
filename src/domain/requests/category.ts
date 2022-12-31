interface BaseCategoryRequest {
    name: string;
}

export type CreateCategoryRequest = BaseCategoryRequest;

export interface UpdateCategoryRequest extends BaseCategoryRequest {
    id: number;
}
