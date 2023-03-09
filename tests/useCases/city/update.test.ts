import { CityRepository, ICityRepository } from '@repositories/city';
import { MockContext, createMockContext } from '../../context';

import { UpdateCityUseCase } from '@useCases/city';
import { CityEntityMock } from '../../mocks/city';

let mockCtx: MockContext;
let citiesRepository: ICityRepository;
let sut: UpdateCityUseCase;

beforeEach(() => {
    mockCtx = createMockContext();
    citiesRepository = new CityRepository(mockCtx.prisma);
    sut = new UpdateCityUseCase(citiesRepository);
});
test('Update city should be successful', async () => {
    // Arrange
    const cityToUpdate = {
        id: 1,
        name: 'XPTO',
        uf: 'MG'
    };
    mockCtx.prisma.city.findFirst.mockResolvedValue(CityEntityMock.single);
    mockCtx.prisma.city.update.mockResolvedValue(cityToUpdate);

    // Act
    const result = await sut.handle(cityToUpdate);

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.response).toStrictEqual(cityToUpdate);
});
test('Update city should return not found', async () => {
    // Arrange
    const cityToUpdate = {
        id: 2,
        name: 'XPTO',
        uf: 'MG'
    };
    mockCtx.prisma.city.findFirst.mockResolvedValue(null);
    mockCtx.prisma.city.update.mockResolvedValue(cityToUpdate);

    // Act
    const result = await sut.handle(cityToUpdate);

    // Assert
    expect(result.statusCode).toBe(404);
    expect(result.response).toStrictEqual({ message: 'City not found!' });
});
