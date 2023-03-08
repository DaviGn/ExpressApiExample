import { City } from '@prisma/client';
import { CityResponse } from '@responses/city';
import { IMockDataFormat } from './mockDataFormat';

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
