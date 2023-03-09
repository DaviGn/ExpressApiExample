"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_1 = require("@repositories/city");
const context_1 = require("../../context");
const city_2 = require("@useCases/city");
const city_3 = require("../../mocks/city");
let mockCtx;
let citiesRepository;
let sut;
beforeEach(() => {
    mockCtx = (0, context_1.createMockContext)();
    citiesRepository = new city_1.CityRepository(mockCtx.prisma);
    sut = new city_2.ListCitiesUseCase(citiesRepository);
});
test('List cities should return empty list', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue([]);
    // Act
    const result = yield sut.handle();
    // Assert
    expect(result.statusCode).toBe(200);
}));
test('List cities should return single city', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue(city_3.CityEntityMock.listSingle);
    // Act
    const result = yield sut.handle();
    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(city_3.CityResponseMock.listSingle);
}));
test('List cities should return list of cities', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue(city_3.CityEntityMock.list);
    // Act
    const result = yield sut.handle();
    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(city_3.CityResponseMock.list);
}));
