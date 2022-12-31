interface BaseCityRequest {
    name: string;
    uf: string;
}

export interface CreateCityRequest extends BaseCityRequest {}

export interface UpdateCityRequest extends BaseCityRequest {}
