import { CityRepository, ICityRepository } from '@repositories/city';
import { MockContext, createMockContext } from '../../context';

import { ListCitiesUseCase } from '@useCases/city';
import { CityEntityMock, CityResponseMock } from '../../mocks/city';

let mockCtx: MockContext;
let citiesRepository: ICityRepository;
let sut: ListCitiesUseCase;

beforeEach(() => {
    mockCtx = createMockContext();
    citiesRepository = new CityRepository(mockCtx.prisma);
    sut = new ListCitiesUseCase(citiesRepository);
});
test('List cities should return empty list', async () => {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue([]);

    // Act
    const result = await sut.handle();

    // Assert
    expect(result.statusCode).toBe(200);
});

test('List cities should return single city', async () => {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue(CityEntityMock.listSingle);

    // Act
    const result = await sut.handle();

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(CityResponseMock.listSingle);
});

test('List cities should return list of cities', async () => {
    // Arrange
    mockCtx.prisma.city.findMany.mockResolvedValue(CityEntityMock.list);

    // Act
    const result = await sut.handle();

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(CityResponseMock.list);
});
