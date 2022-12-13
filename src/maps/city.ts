import { City } from '@prisma/client';
import { CityResponse } from '../domain/response/city';

export function toCityResponse(city: City): CityResponse {
  return {
    id: city.id,
    name: city.name,
    uf: city.uf,
  };
}
