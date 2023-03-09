import { City } from '@prisma/client';
import { CityResponse } from '@responses/city';
import { IMockDataFormat } from './mockDataFormat';
import { CreateCityRequest } from '@domain/requests/city';

export const CityEntityMock: IMockDataFormat<City> = {
    single: {
        id: 1,
        name: 'Santo André',
        uf: 'SP'
    },
    listSingle: [
        {
            id: 1,
            name: 'Santo André',
            uf: 'SP'
        }
    ],
    list: [
        {
            id: 1,
            name: 'Santo André',
            uf: 'SP'
        },
        {
            id: 2,
            name: 'São Paulo',
            uf: 'SP'
        }
    ]
};

export const CityResponseMock: IMockDataFormat<CityResponse> = {
    single: {
        id: 1,
        name: 'Santo André',
        uf: 'SP'
    },
    listSingle: [
        {
            id: 1,
            name: 'Santo André',
            uf: 'SP'
        }
    ],
    list: [
        {
            id: 1,
            name: 'Santo André',
            uf: 'SP'
        },
        {
            id: 2,
            name: 'São Paulo',
            uf: 'SP'
        }
    ]
};

export const CityRequestMock: IMockDataFormat<CreateCityRequest> = {
    single: {
        name: 'Santo André',
        uf: 'SP'
    },
    listSingle: [],
    list: []
};
