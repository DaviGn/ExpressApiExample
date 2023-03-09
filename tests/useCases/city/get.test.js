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
    sut = new city_2.GetCityUseCase(citiesRepository);
});
test('Get city should return not found result', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(null);
    // Act
    const result = yield sut.handle(1);
    // Assert
    expect(result.statusCode).toBe(404);
    expect(result.response).toStrictEqual({ message: 'City not found!' });
}));
test('Get city should return a city', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(city_3.CityEntityMock.single);
    // Act
    const result = yield sut.handle(1);
    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(city_3.CityResponseMock.single);
}));
