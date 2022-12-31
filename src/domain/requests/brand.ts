interface BaseBrandRequest {
    name: string;
}

export type CreateBrandRequest = BaseBrandRequest;

export interface UpdateBrandRequest extends BaseBrandRequest {
    id: number;
}
