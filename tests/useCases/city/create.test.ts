import { CityRepository, ICityRepository } from '@repositories/city';
import { MockContext, createMockContext } from '../../context';

import { CreateCityUseCase } from '@useCases/city';
import { CityRequestMock } from '../../mocks/city';

let mockCtx: MockContext;
let citiesRepository: ICityRepository;
let sut: CreateCityUseCase;

beforeEach(() => {
    mockCtx = createMockContext();
    citiesRepository = new CityRepository(mockCtx.prisma);
    sut = new CreateCityUseCase(citiesRepository);
});
test('Create city should be successful', async () => {
    // Arrange
    const createdCity = {
        id: 1,
        ...CityRequestMock.single
    };
    mockCtx.prisma.city.create.mockResolvedValue(createdCity);

    // Act
    const result = await sut.handle(CityRequestMock.single);

    // Assert
    expect(result.statusCode).toBe(201);
    expect(result.response).toStrictEqual(createdCity);
});
