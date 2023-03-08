import { CityRepository, ICityRepository } from '@repositories/city';
import { MockContext, createMockContext } from '../../context';

import { GetCityUseCase } from '@useCases/city';
import { CityEntityMock, CityResponseMock } from '../../mocks/city';

let mockCtx: MockContext;
let citiesRepository: ICityRepository;
let sut: GetCityUseCase;

beforeEach(() => {
    mockCtx = createMockContext();
    citiesRepository = new CityRepository(mockCtx.prisma);
    sut = new GetCityUseCase(citiesRepository);
});
test('Get city should return not found result', async () => {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(null);

    // Act
    const result = await sut.handle(1);

    // Assert
    expect(result.statusCode).toBe(404);
    expect(result.response).toStrictEqual({ message: 'City not found!' });
});

test('Get city should return a city', async () => {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(CityEntityMock.single);

    // Act
    const result = await sut.handle(1);

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(CityResponseMock.single);
});
