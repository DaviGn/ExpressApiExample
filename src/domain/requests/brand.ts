interface BaseBrandRequest {
  name: string;
}

export interface CreateBrandRequest extends BaseBrandRequest {}

export interface UpdateBrandRequest extends BaseBrandRequest {
  id: number;
}
