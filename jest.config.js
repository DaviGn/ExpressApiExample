"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@requests/(.*)$': '<rootDir>/src/requests/$1',
        '^@responses/(.*)$': '<rootDir>/src/responses/$1',
        '^@maps/(.*)$': '<rootDir>/src/maps/$1',
        '^@presenters/(.*)$': '<rootDir>/src/presenters/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
        '^@useCases/(.*)$': '<rootDir>/src/useCases/$1'
    },
    modulePaths: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
