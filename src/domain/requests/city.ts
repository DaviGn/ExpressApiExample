interface BaseCityRequest {
    name: string;
    uf: string;
}

export type CreateCityRequest = BaseCityRequest;

export type UpdateCityRequest = BaseCityRequest;
