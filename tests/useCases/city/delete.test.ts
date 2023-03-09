import { CityRepository, ICityRepository } from '@repositories/city';
import { MockContext, createMockContext } from '../../context';

import { DeleteCityUseCase } from '@useCases/city';
import { CityEntityMock } from '../../mocks/city';

let mockCtx: MockContext;
let citiesRepository: ICityRepository;
let sut: DeleteCityUseCase;

beforeEach(() => {
    mockCtx = createMockContext();
    citiesRepository = new CityRepository(mockCtx.prisma);
    sut = new DeleteCityUseCase(citiesRepository);
});
test('Delete city should be successful', async () => {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(CityEntityMock.single);

    // Act
    const result = await sut.handle(1);

    // Assert
    expect(result.statusCode).toBe(204);
});
test('Delete city should return not found', async () => {
    // Arrange
    mockCtx.prisma.city.findFirst.mockResolvedValue(null);

    // Act
    const result = await sut.handle(1);

    // Assert
    expect(result.statusCode).toBe(404);
    expect(result.response).toStrictEqual({ message: 'City not found!' });
});
