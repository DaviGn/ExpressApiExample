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
    sut = new city_2.CreateCityUseCase(citiesRepository);
});
test('Create city should be successful', () => __awaiter(void 0, void 0, void 0, function* () {
    // Arrange
    const createdCity = Object.assign({ id: 1 }, city_3.CityRequestMock.single);
    mockCtx.prisma.city.create.mockResolvedValue(createdCity);
    // Act
    const result = yield sut.handle(city_3.CityRequestMock.single);
    // Assert
    expect(result.statusCode).toBe(201);
    expect(result.response).toStrictEqual(createdCity);
}));
