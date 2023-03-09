"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRequestMock = exports.CityResponseMock = exports.CityEntityMock = void 0;
exports.CityEntityMock = {
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
exports.CityResponseMock = {
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
exports.CityRequestMock = {
    single: {
        name: 'Santo André',
        uf: 'SP'
    },
    listSingle: [],
    list: []
};
